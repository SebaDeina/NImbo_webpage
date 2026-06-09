import { useMemo } from 'react'
import { PROJECTS } from '../data/projects'

export function useProjects() {
  return { projects: PROJECTS, loading: false }
}

export function useProject(slug) {
  return useMemo(
    () => PROJECTS.find((p) => p.slug === slug) ?? null,
    [slug]
  )
}
