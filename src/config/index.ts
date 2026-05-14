import type { ScenarioConfig } from '@/types/scenario'
import { petScenarios } from './scenarios/pets'
import { hobbyScenarios } from './scenarios/hobbies'
import { careerScenarios } from './scenarios/career'

export const allScenarios: ScenarioConfig[] = [
  ...petScenarios,
  ...hobbyScenarios,
  ...careerScenarios,
]

export function getScenariosByCategory(category: string): ScenarioConfig[] {
  return allScenarios.filter((s) => s.category === category)
}

export function getScenarioBySlug(slug: string): ScenarioConfig | undefined {
  return allScenarios.find((s) => s.slug === slug)
}

export function getScenarioById(id: string): ScenarioConfig | undefined {
  return allScenarios.find((s) => s.id === id)
}

export function searchScenarios(query: string): ScenarioConfig[] {
  const q = query.toLowerCase()
  return allScenarios.filter(
    (s) =>
      s.title.includes(q) ||
      s.description.includes(q) ||
      s.category.includes(q) ||
      s.slug.includes(q)
  )
}
