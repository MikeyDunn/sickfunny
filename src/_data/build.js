import { execSync } from 'node:child_process'

function sh(cmd, fallback) {
  try {
    return execSync(cmd).toString().trim()
  } catch {
    return fallback
  }
}

export default {
  sha: sh('git rev-parse --short HEAD', 'unknown'),
  date: new Date().toISOString().slice(0, 10),
}
