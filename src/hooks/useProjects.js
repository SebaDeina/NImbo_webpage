import { useEffect, useState } from 'react'
import { PROJECTS } from '../data/projects'
import { getProject } from '../lib/cms'

export function useProjects() {
  return { projects: PROJECTS, loading: false }
}

export function useProject(slug) {
  const [project, setProject] = useState(undefined) // undefined = loading, null = not found
  useEffect(() => {
    let alive = true
    setProject(undefined)
    getProject(slug).then((p) => {
      if (alive) setProject(p)
    })
    return () => {
      alive = false
    }
  }, [slug])
  return project
}
