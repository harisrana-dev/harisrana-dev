export type TNavLink = { id: string; title: string }
export type TProject = { name: string; description: string; tags: { name: string; color: string }[]; status: string; sourceCodeLink?: string }
export type TCapabilityDomain = { domain: string; description: string; items: string[]; icon: string }
export type TResearchInterest = { title: string; description: string }
export type TExperience = { title: string; companyName: string; role: string; date: string; summary: string; points: string[] }
