import { platformConfig } from '../config.js'

const { demo } = platformConfig

export function isDemoEnabled() {
  return demo.enabled
}

export function getDemoWorkspace() {
  return { ...demo.workspace }
}
