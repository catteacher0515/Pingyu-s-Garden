# Projects Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/projects` into a poster-consistent selected-works page with four summary cards, single-project expansion, and modular detail panels.

**Architecture:** Replace the current one-card placeholder page with a data-driven selected-works layout. Expand the project data model so each project can render summary content, structured detail panels, and optional diagrams. Keep the page route stable while splitting rendering into focused project-page components that match the site’s poster-style visual language.

**Tech Stack:** React 19, TypeScript, React Router, Tailwind CSS, Vitest, Testing Library

---

## File Structure

- Modify: `src/types.ts`
  - Expand the `Project` type from the current placeholder shape into a summary-first, detail-panel-ready structure.
- Modify: `src/data/projects.ts`
  - Replace the current single seed project with four fixed representative placeholder entries that match the approved page structure without inventing real project claims.
- Create: `src/components/Projects/ProjectsHeader.tsx`
  - Render the restrained page header copy for selected works.
- Create: `src/components/Projects/ProjectSummaryGrid.tsx`
  - Render the four summary cards and expose the selected project state.
- Create: `src/components/Projects/ProjectSummaryCard.tsx`
  - Render one archive-cover-style summary card with sequence, positioning, problem statement, tags, and expand action.
- Create: `src/components/Projects/ProjectDetailPanels.tsx`
  - Render the expanded single-project detail area with section panels and optional diagram block.
- Modify: `src/pages/ProjectsPage.tsx`
  - Replace the current placeholder card list with the new header, summary grid, and detail panel composition.
- Modify: `src/pages/DetailPages.test.tsx`
  - Replace the old placeholder expectations with summary-grid and single-expand behavior coverage.

### Task 1: Reshape Project Data Contracts

**Files:**
- Modify: `src/types.ts`
- Modify: `src/data/projects.ts`
- Test: `src/pages/DetailPages.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it('renders four ranked project summary cards with problem-first copy', () => {
  render(
    <MemoryRouter>
      <ProjectsPage />
    </MemoryRouter>,
  )

  expect(projects).toHaveLength(4)
  expect(screen.getByText('Selected Works / 04 Projects')).toBeInTheDocument()

  const headings = screen.getAllByRole('heading', { level: 2 }).map((node) => node.textContent)
  expect(headings).toEqual(projects.map((project) => project.title))

  expect(screen.getByText(projects[0].positioning)).toBeInTheDocument()
  expect(screen.getByText(projects[0].problem)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: `展开 ${projects[0].title} 项目档案` })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/pages/DetailPages.test.tsx -t "renders four ranked project summary cards with problem-first copy"`

Expected: FAIL because `projects` still has one placeholder entry and `Project` has no `positioning` or `problem` fields.

- [ ] **Step 3: Write minimal implementation**

Update `src/types.ts` to define a structured project contract:

```ts
export interface ProjectDetailSection {
  id: 'problem' | 'solution' | 'highlights' | 'tech-stack' | 'results' | 'diagram'
  title: string
  body: string
  items?: string[]
}

export interface ProjectLink {
  label: string
  href?: string
  kind: ProjectLinkKind
}

export interface Project {
  id: string
  rank: number
  title: string
  year: string
  status: ProjectStatus
  positioning: string
  problem: string
  tags: string[]
  sections: ProjectDetailSection[]
  links: ProjectLink[]
}
```

Replace `src/data/projects.ts` with four fixed placeholder records that match the approved structure without inventing user claims:

```ts
export const projects: Project[] = [
  {
    id: 'project-slot-01',
    rank: 1,
    title: '代表项目 01',
    year: '2026',
    status: '规划中',
    positioning: '用于承接后续真实代表项目的摘要封面位。',
    problem: '这个项目需要解决的核心问题会在你提供真实项目后替换到这里。',
    tags: ['代表作', '问题导向', '待填真实内容'],
    sections: [
      { id: 'problem', title: '问题', body: '待用真实项目问题替换。' },
      { id: 'solution', title: '方案', body: '待用真实项目方案替换。' },
      { id: 'highlights', title: '亮点', body: '待用真实项目亮点替换。' },
      { id: 'tech-stack', title: '技术栈', body: '待用真实技术栈替换。' },
      { id: 'results', title: '结果', body: '待用真实结果替换。' },
    ],
    links: [],
  },
]
```

Then expand it to four entries with `rank: 1..4`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/pages/DetailPages.test.tsx -t "renders four ranked project summary cards with problem-first copy"`

Expected: PASS once the page can consume four structured projects.

- [ ] **Step 5: Commit**

```bash
git add src/types.ts src/data/projects.ts src/pages/DetailPages.test.tsx
git commit -m "feat: add structured projects page data model"
```

### Task 2: Build Summary Grid and Single-Expand Interaction

**Files:**
- Create: `src/components/Projects/ProjectsHeader.tsx`
- Create: `src/components/Projects/ProjectSummaryGrid.tsx`
- Create: `src/components/Projects/ProjectSummaryCard.tsx`
- Modify: `src/pages/ProjectsPage.tsx`
- Test: `src/pages/DetailPages.test.tsx`

- [ ] **Step 1: Write the failing test**

Add interaction coverage:

```tsx
it('shows one selected project detail area and switches it when another summary card is opened', async () => {
  const user = userEvent.setup()

  render(
    <MemoryRouter>
      <ProjectsPage />
    </MemoryRouter>,
  )

  expect(screen.getByText(projects[0].sections[0].body)).toBeInTheDocument()
  expect(screen.queryByText(projects[1].sections[0].body)).not.toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: `展开 ${projects[1].title} 项目档案` }))

  expect(screen.getByText(projects[1].sections[0].body)).toBeInTheDocument()
  expect(screen.queryByText(projects[0].sections[0].body)).not.toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/pages/DetailPages.test.tsx -t "shows one selected project detail area and switches it when another summary card is opened"`

Expected: FAIL because the current page has no summary buttons and no single-expand state.

- [ ] **Step 3: Write minimal implementation**

Create a restrained header component in `src/components/Projects/ProjectsHeader.tsx`:

```tsx
interface ProjectsHeaderProps {
  title: string
  subtitle: string
}

export default function ProjectsHeader({ title, subtitle }: ProjectsHeaderProps) {
  return (
    <header className="rounded-[2rem] border border-[#8f4b36]/45 bg-[#f3e7d1]/92 px-6 py-7 text-[#24130f] shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
      <p className="text-[0.7rem] uppercase tracking-[0.32em] text-[#8f4b36]">Selected Works / 04 Projects</p>
      <h1 className="mt-3 font-serif text-3xl text-[#24130f]">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#4e342c]">{subtitle}</p>
    </header>
  )
}
```

Create `src/components/Projects/ProjectSummaryCard.tsx`:

```tsx
interface ProjectSummaryCardProps {
  project: Project
  selected: boolean
  onSelect: (projectId: string) => void
}

export default function ProjectSummaryCard({ project, selected, onSelect }: ProjectSummaryCardProps) {
  return (
    <article className={selected ? '...' : '...'}>
      <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#8f4b36]">
        {String(project.rank).padStart(2, '0')}
      </p>
      <h2 className="mt-3 text-xl text-[#24130f]">{project.title}</h2>
      <p className="mt-3 text-sm leading-7 text-[#5b3a31]">{project.positioning}</p>
      <p className="mt-4 text-base leading-8 text-[#24130f]">{project.problem}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-[#8f4b36]/30 px-3 py-1 text-xs text-[#6b4638]">
            {tag}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onSelect(project.id)}
        aria-pressed={selected}
        aria-label={`展开 ${project.title} 项目档案`}
        className="mt-6 inline-flex items-center rounded-full border border-[#8f4b36] px-4 py-2 text-sm text-[#24130f]"
      >
        {selected ? '当前正在查看' : '展开项目档案'}
      </button>
    </article>
  )
}
```

Create `src/components/Projects/ProjectSummaryGrid.tsx` to map the four cards and pass selection state:

```tsx
interface ProjectSummaryGridProps {
  projects: Project[]
  selectedProjectId: string
  onSelect: (projectId: string) => void
}
```

Update `src/pages/ProjectsPage.tsx` to keep a single selected project:

```tsx
const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id ?? '')
const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? projects[0]
```

Then render:

```tsx
<PageShell title="项目" subtitle="四个按重要性排序的代表项目，先看问题，再展开完整方案。">
  <div className="space-y-8">
    <ProjectsHeader title="项目" subtitle="只放可写进简历的代表项目，按重要性排序，展开查看完整项目档案。" />
    <ProjectSummaryGrid
      projects={projects}
      selectedProjectId={selectedProject.id}
      onSelect={setSelectedProjectId}
    />
  </div>
</PageShell>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/pages/DetailPages.test.tsx -t "shows one selected project detail area and switches it when another summary card is opened"`

Expected: PASS once exactly one project stays selected at a time.

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects src/pages/ProjectsPage.tsx src/pages/DetailPages.test.tsx
git commit -m "feat: add projects summary wall interaction"
```

### Task 3: Add Modular Detail Panels and Poster-Consistent Styling

**Files:**
- Create: `src/components/Projects/ProjectDetailPanels.tsx`
- Modify: `src/pages/ProjectsPage.tsx`
- Modify: `src/pages/DetailPages.test.tsx`

- [ ] **Step 1: Write the failing test**

Add detail panel coverage:

```tsx
it('renders modular detail panels for the selected project', () => {
  render(
    <MemoryRouter>
      <ProjectsPage />
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { name: '问题' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '方案' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '亮点' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '技术栈' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '结果' })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/pages/DetailPages.test.tsx -t "renders modular detail panels for the selected project"`

Expected: FAIL because the current page does not render a dedicated detail panel group.

- [ ] **Step 3: Write minimal implementation**

Create `src/components/Projects/ProjectDetailPanels.tsx`:

```tsx
interface ProjectDetailPanelsProps {
  project: Project
}

const featuredSectionIds = new Set(['problem', 'solution'])

export default function ProjectDetailPanels({ project }: ProjectDetailPanelsProps) {
  return (
    <section aria-label={`${project.title} 项目详情`} className="rounded-[2rem] border border-[#8f4b36]/35 bg-[#f3e7d1]/94 p-6 text-[#24130f] shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#8f4b36]/18 pb-4">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#8f4b36]">
            {String(project.rank).padStart(2, '0')} / 当前展开项目
          </p>
          <h2 className="mt-2 text-2xl">{project.title}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.links.length > 0 ? project.links.map((link) => <a key={...}>{link.label}</a>) : null}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {project.sections.map((section) => (
          <article
            key={section.id}
            className={featuredSectionIds.has(section.id) ? 'min-h-[15rem] rounded-[1.6rem] border border-[#8f4b36]/30 bg-[#f8efdf] p-5 lg:col-span-2' : 'rounded-[1.6rem] border border-[#8f4b36]/24 bg-[#f7ecd9] p-5'}
          >
            <h3 className="text-lg text-[#24130f]">{section.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#4e342c]">{section.body}</p>
            {section.items ? (
              <ul className="mt-4 space-y-2 text-sm leading-7 text-[#3f2a24]">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}
```

Update `src/pages/ProjectsPage.tsx` to render:

```tsx
{selectedProject ? <ProjectDetailPanels project={selectedProject} /> : null}
```

Also replace the old glassmorphism-heavy `PageShell` subtitle copy with project-page-specific copy already approved in the spec.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/pages/DetailPages.test.tsx -t "renders modular detail panels for the selected project"`

Expected: PASS once the five approved module headings render for the selected project.

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects/ProjectDetailPanels.tsx src/pages/ProjectsPage.tsx src/pages/DetailPages.test.tsx
git commit -m "feat: add modular projects detail panels"
```

### Task 4: Verify Full Page Behavior and Clean Up Legacy Expectations

**Files:**
- Modify: `src/pages/DetailPages.test.tsx`
- Modify: `src/pages/ProjectsPage.tsx`

- [ ] **Step 1: Write the failing test**

Add a final regression test for page-level identity:

```tsx
it('keeps the projects page distinct from the tools-page list pattern', () => {
  render(
    <MemoryRouter>
      <ProjectsPage />
    </MemoryRouter>,
  )

  expect(screen.queryByText('链接计划')).not.toBeInTheDocument()
  expect(screen.queryByText('后续补充建议')).not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: `展开 ${projects[0].title} 项目档案` })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/pages/DetailPages.test.tsx -t "keeps the projects page distinct from the tools-page list pattern"`

Expected: FAIL until the old placeholder copy is fully removed.

- [ ] **Step 3: Write minimal implementation**

Delete all remaining legacy project-page elements from `src/pages/ProjectsPage.tsx`:

```tsx
// Remove:
// - old metadata row with role/year/status inline
// - "链接计划" label
// - placeholder outcome paragraph
// - dashed "后续补充建议" section
```

Keep the final page tree focused:

```tsx
<PageShell title="项目" subtitle="四个按重要性排序的代表项目，先看问题，再展开完整方案。">
  <div className="space-y-8">
    <ProjectsHeader ... />
    <ProjectSummaryGrid ... />
    <ProjectDetailPanels project={selectedProject} />
  </div>
</PageShell>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/pages/DetailPages.test.tsx`

Expected: PASS with updated profile-page tests still green.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ProjectsPage.tsx src/pages/DetailPages.test.tsx
git commit -m "refactor: finalize projects page poster layout"
```

## Self-Review

- Spec coverage:
  - Four fixed ranked projects: Task 1
  - Summary-first cards with problem-first copy: Task 1, Task 2
  - Single-project expansion: Task 2
  - Modular detail panels in approved order: Task 3
  - Removal of legacy placeholder/list-page behavior: Task 4
  - Distinction from tools page: Task 4
- Placeholder scan:
  - No `TODO`, `TBD`, or “implement later” placeholders in task steps.
  - Each code-edit step names concrete files and code targets.
- Type consistency:
  - `Project.positioning`, `Project.problem`, and `Project.sections` are introduced in Task 1 and reused consistently in Tasks 2-4.

