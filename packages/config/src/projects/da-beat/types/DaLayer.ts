import type { ScalingProjectTechnologyChoice } from '../../../common'
import type { DataAvailabilityLayer as ScalingDaLayerOption } from '../../../common'
import type {
  EnshrinedBridge,
  IntegratedDacBridge,
  NoDaBridge,
  NoDacBridge,
  OnChainDaBridge,
  StandaloneDacBridge,
} from './DaBridge'
import type { DaChallengeMechanism } from './DaChallengeMechanism'
import type { DaConsensusAlgorithm } from './DaConsensusAlgorithm'
import type { DaEconomicSecurity } from './DaEconomicSecurity'
import type { DaEconomicSecurityRisk } from './DaEconomicSecurityRisk'
import type { DaFraudDetectionRisk } from './DaFraudDetectionRisk'
import type { DaLayerThroughput } from './DaLayerThroughput'
import type { DaLinks } from './DaLinks'
import type { DaTechnology } from './DaTechnology'
import type { DataAvailabilitySampling } from './DataAvailabilitySampling'
import type { EthereumDaLayerRisks } from './EthereumDaRisks'

export type DaLayer = BlockchainDaLayer | EthereumDaLayer | DaServiceDaLayer

export type BlockchainDaLayer = CommonDaLayer & {
  kind: 'PublicBlockchain'
  bridges: (OnChainDaBridge | NoDaBridge)[]
  /** Risks associated with the data availability layer. */
  risks: DaLayerRisks
  /** The period within which full nodes must store and distribute data. @unit seconds */
  pruningWindow: number
  /** The consensus algorithm used by the data availability layer. */
  consensusAlgorithm: DaConsensusAlgorithm
  /** Details about data availability throughput. */
  throughput?: DaLayerThroughput
  /** Details about data availability sampling. */
  dataAvailabilitySampling?: DataAvailabilitySampling
  /** Economic security configuration. */
  economicSecurity?: DaEconomicSecurity
}

export type EthereumDaLayer = CommonDaLayer & {
  kind: 'EthereumDaLayer'
  bridges: [EnshrinedBridge]
  /** Risks associated with the data availability layer. */
  risks: EthereumDaLayerRisks
  /** The period within which full nodes must store and distribute data. @unit seconds */
  pruningWindow: number
  /** The consensus algorithm used by the data availability layer. */
  consensusAlgorithm: DaConsensusAlgorithm
  /** Details about data availability throughput. */
  throughput?: DaLayerThroughput
  /** Economic security configuration. */
  economicSecurity?: DaEconomicSecurity
}

export type DacDaLayer = Omit<CommonDaLayer, 'id' | 'display'> & {
  display?: {
    // Rest will be linked dynamically from scaling
    description?: string
    name?: string
  }
  kind: 'DAC' | 'No DAC'
  bridge: IntegratedDacBridge | NoDacBridge
  /** Risks associated with the data availability layer. */
  risks: DaLayerRisks
  /** Fallback */
  fallback?: ScalingDaLayerOption
  /** Supported challenge mechanism in place */
  challengeMechanism?: DaChallengeMechanism
  /** Number of operators in the data availability layer. */
  numberOfOperators?: number
}

export type DaServiceDaLayer = CommonDaLayer & {
  kind: 'DA Service'
  bridges: (StandaloneDacBridge | NoDaBridge)[]
  /** Risks associated with the data availability layer. */
  risks: DaLayerRisks
}

export type CommonDaLayer = {
  type: 'DaLayer'
  /** Unique identifier of the data availability layer. */
  id: string
  /** Classification layers will be split based on */
  systemCategory: 'public' | 'custom'
  /** Display information for the data availability layer. */
  display: DaLayerDisplay
  /** Is the DA layer upcoming? */
  isUpcoming?: boolean
  /** Is the DA layer under review? */
  isUnderReview?: boolean
  /** The technology used by the data availability layer. */
  technology: DaTechnology
  /** Other considerations */
  otherConsiderations?: ScalingProjectTechnologyChoice[]
}

export type DaLayerRisks = {
  economicSecurity: DaEconomicSecurityRisk
  fraudDetection: DaFraudDetectionRisk
}

interface DaLayerDisplay {
  /** The name of the data availability layer. */
  name: string
  /** Slug of the data availability layer. */
  slug: string
  /** A short description of the data availability layer. */
  description: string
  /** Links related to the data availability layer. */
  links?: DaLinks
}
