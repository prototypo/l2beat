import type { DaBridgeRisks, NoDaBridge, ProjectLinks } from '../../../types'
import { DaCommitteeSecurityRisk, DaUpgradeabilityRisk } from '../common'
import { DaRelayerFailureRisk } from '../common/DaRelayerFailureRisk'
import { linkByDA } from '../utils/link-by-da'

type TemplateSpecific = {
  /** DA layer name to automatically match projects with */
  layer: string
  addedAt: NoDaBridge['addedAt']
}

type Optionals = Partial<{
  links: ProjectLinks
  risks: Partial<NoDaBridge['risks']>
  usedIn: NoDaBridge['usedIn']
  warnings: NoDaBridge['display']['warning']
  redWarnings: NoDaBridge['display']['redWarning']
  description: NoDaBridge['display']['description']
  technology: NoDaBridge['technology']
  otherConsiderations: NoDaBridge['otherConsiderations']
}>

type TemplateVars = Optionals & TemplateSpecific

export function NO_BRIDGE(template: TemplateVars): NoDaBridge {
  const id = 'no-bridge'
  const type = 'NoBridge'
  const description =
    template.description ??
    'This project does not have a DA bridge on Ethereum.'

  const technology = {
    description:
      template.technology?.description ?? 'There is no DA bridge on Ethereum.',
    risks: template.technology?.risks,
  }

  const usedIn =
    template.usedIn ??
    linkByDA({
      layer: (layer) => layer === template.layer,
      bridge: (bridge) => bridge === 'None',
    })
  const display = {
    name: 'No bridge',
    slug: `no-bridge`,
    description,
    links: {
      ...template.links,
    },
  }

  const risks = {
    committeeSecurity: DaCommitteeSecurityRisk.NoBridge,
    upgradeability: DaUpgradeabilityRisk.NoBridge,
    relayerFailure: DaRelayerFailureRisk.NoBridge,
    ...template.risks,
  } satisfies DaBridgeRisks

  return {
    id,
    type,
    addedAt: template.addedAt,
    display,
    risks,
    technology,
    usedIn,
    otherConsiderations: template.otherConsiderations,
  }
}
