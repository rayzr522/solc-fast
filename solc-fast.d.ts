declare module 'solc-fast' {
  type SoliditySourceFile = {
    keccak256?: string
  } & ({ urls: string[] } | { content: string })

  export interface SolidityStandardJsonInput {
    language: 'Solidity' | 'Yul'
    sources: {
      [fileName: string]: SoliditySourceFile
    }
    settings?: {
      stopAfter?: 'parsing'
      remappings?: string[]
      optimizer?: {
        enabled: boolean
        runs: number
        details?: any
      }
      evmVersion?:
        | 'homestead'
        | 'tangerineWhistle'
        | 'spuriousDragon'
        | 'byzantium'
        | 'constantinople'
        | 'petersburg'
        | 'istanbul'
        | 'berlin'
      viaIR?: boolean
      debug?: {
        revertStrings?: 'default' | 'strip' | 'debug' | 'verboseDebug'
        debugInfo?: ['location' | 'snippet' | '*']
      }
      metadata?: {
        useLiteralContent?: boolean
        bytecodeHash?: 'none' | 'ipfs' | 'bzzr1'
      }
      libraries?: {
        [libraryName: string]: { [contractName: string]: string }
      }
      outputSelection?: Record<string, any>
      modelChecker?: any
    }
  }

  interface SourceLocation {
    file: string
    start: number
    end: number
  }

  interface Bytecode {
    functionDebugData: Record<string, any>
    object: string
    opcodes: string
    sourceMap: string
    generatedSources: Record<string, any>
    linkReferences?: Record<string, any>
  }

  export interface SolidityStandardJsonOutput {
    errors?: {
      sourceLocation?: SourceLocation
      secondarySourceLocations?: SourceLocation[]
      type: string
      component: string
      message: string
      severity: 'error' | 'warning' | 'info'
      errorCode?: string
      formattedMessage?: string
    }[]
    sources: { [fileName: string]: { id: string; ast: Record<string, any> } }
    contracts: {
      [fileName: string]: {
        [contractName: string]: {
          abi: any[]
          evm: {
            assembly: string
            legacyAssembly: any
            bytecode: Bytecode
            deployedBytecode: Bytecode & {
              immutableReferences?: Record<string, any>
            }
            methodIdentifiers: Record<string, string>
            gasEstimates: {
              creation: Record<string, string>
              external: Record<string, string>
              internal: Record<string, string>
            }
          }
          metadata: any
          userdoc: any
          devdoc: any
        }
      }
    }
  }

  export function compile(
    input: SolidityStandardJsonInput
  ): Promise<SolidityStandardJsonOutput>
}
