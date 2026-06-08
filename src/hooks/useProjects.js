import { useEffect, useState } from 'react'
import { getProjects, getProject } from '../lib/cms'

export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let alive = true
    getProjects().then((p) => {
      if (alive) {
        setProjects(p)
        setLoading(false)
      }
    })
    return () => {
      alive = false
    }
  }, [])
  return { projects, loading }
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
