import { bridges } from '@l2beat/config'
import { compact } from 'lodash'
import { getUnderReviewStatus } from '~/utils/project/under-review'
import {
  type ProjectsChangeReport,
  getProjectsChangeReport,
} from '../projects-change-report/get-projects-change-report'
import {
  type LatestTvl,
  get7dTokenBreakdown,
} from '../scaling/tvl/utils/get-7d-token-breakdown'
import { getAssociatedTokenWarning } from '../scaling/tvl/utils/get-associated-token-warning'
import { orderByTvl } from '../scaling/tvl/utils/order-by-tvl'
import { isAnySectionUnderReview } from '../scaling/utils/is-any-section-under-review'
import { getProjectsVerificationStatuses } from '../verification-status/get-projects-verification-statuses'
import { getDestination } from './get-destination'

export async function getBridgesSummaryEntries() {
  const [tvl7dBreakdown, projectsChangeReport] = await Promise.all([
    get7dTokenBreakdown({ type: 'bridge' }),
    getProjectsChangeReport(),
  ])

  return getBridges({
    tvl7dBreakdown,
    projectsChangeReport,
  })
}

interface Params {
  tvl7dBreakdown: LatestTvl
  projectsChangeReport: ProjectsChangeReport
}

function getBridges(params: Params) {
  const { tvl7dBreakdown, projectsChangeReport } = params
  const activeBridges = bridges.filter(
    (bridge) => !bridge.isArchived && !bridge.isUpcoming,
  )
  const entries = activeBridges.map((bridge) => {
    const bridgeTvl = tvl7dBreakdown.projects[bridge.id.toString()]

    const associatedTokenWarning =
      bridgeTvl && bridgeTvl.breakdown.total > 0
        ? getAssociatedTokenWarning({
            associatedRatio:
              bridgeTvl.breakdown.associated / bridgeTvl.breakdown.total,
            name: bridge.display.name,
            associatedTokens: bridge.config.associatedTokens ?? [],
          })
        : undefined

    const isVerified = getProjectsVerificationStatuses(bridge)
    const hasImplementationChanged =
      projectsChangeReport.hasImplementationChanged(bridge.id.toString())
    const hasHighSeverityFieldChanged =
      projectsChangeReport.hasHighSeverityFieldChanged(bridge.id.toString())

    return {
      id: bridge.id,
      href: `/bridges/projects/${bridge.display.slug}`,
      type: bridge.type,
      shortName: bridge.display.shortName,
      name: bridge.display.name,
      slug: bridge.display.slug,
      isArchived: bridge.isArchived,
      isUpcoming: bridge.isUpcoming,
      isVerified,
      destination: getDestination(
        bridge.type === 'bridge'
          ? bridge.technology.destination
          : [bridge.display.name],
      ),
      underReviewStatus: getUnderReviewStatus({
        isUnderReview: isAnySectionUnderReview(bridge),
        hasImplementationChanged,
        hasHighSeverityFieldChanged,
      }),
      tvl: {
        breakdown: bridgeTvl?.breakdown,
        change: bridgeTvl?.change,
        associatedTokens: bridge.config.associatedTokens ?? [],
        associatedTokenWarning,
        warnings: compact([
          associatedTokenWarning?.sentiment === 'bad' && associatedTokenWarning,
        ]),
      },
      validatedBy: bridge.riskView.validatedBy,
      category: bridge.display.category,
      warning: bridge.display.warning,
    }
  })

  // Use data we already pulled instead of fetching it again
  const remappedForOrdering = Object.fromEntries(
    Object.entries(tvl7dBreakdown.projects).map(([k, v]) => [
      k,
      v.breakdown.total,
    ]),
  )

  return orderByTvl(entries, remappedForOrdering)
}

export type BridgesSummaryEntry = Awaited<
  ReturnType<typeof getBridgesSummaryEntries>
>[number]
