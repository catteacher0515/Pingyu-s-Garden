import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { projects as baseProjects } from '../data/projects'
import ProfilePage from './ProfilePage'
import ProjectsPage from './ProjectsPage'

vi.mock('../data/projects', async () => {
  const actual = await vi.importActual<typeof import('../data/projects')>('../data/projects')

  return {
    ...actual,
    projects: actual.projects.map((project) => ({
      ...project,
      sections: [project.sections[1], project.sections[0], ...project.sections.slice(2)],
    })),
  }
})

afterEach(() => {
  cleanup()
})

describe('detail pages', () => {
  it('renders the profile about page content and links', () => {
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '关于花萍雨' })).toBeInTheDocument()
    expect(screen.getByText('我是花萍雨，一个还在探索中的开发者和内容创作者。')).toBeInTheDocument()
    expect(
      screen.getByText('我用 AI 和代码做一些小工具，记录自己如何学习、试错、搭建工作流，也把那些真正有用的开源项目介绍给更多人。'),
    ).toBeInTheDocument()

    expect(screen.getByText('大二下在读')).toBeInTheDocument()
    expect(screen.getByText('AI + Code')).toBeInTheDocument()
    expect(screen.getByText('学习记录')).toBeInTheDocument()
    expect(screen.getByText('小工具开发')).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: '我在探索什么' })).toBeInTheDocument()
    expect(screen.getByText('AI skill 与开源工具')).toBeInTheDocument()
    expect(screen.getByText('内容创作工作流')).toBeInTheDocument()
    expect(screen.getByText('用代码解决真实问题')).toBeInTheDocument()
    expect(screen.getByText('编程 / 数据学习记录')).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: '我如何输出' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^文章/ })).toHaveAttribute('href', '/articles')
    expect(screen.getByRole('link', { name: /^小工具/ })).toHaveAttribute('href', '/tools')

    expect(screen.getByRole('heading', { name: '联系我' })).toBeInTheDocument()
    expect(screen.getByText('知乎主页')).toBeInTheDocument()
    expect(screen.getByText('微信')).toBeInTheDocument()
    expect(screen.getByText('ssm0515ssm')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('catteacher0515')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /catteacher0515/ })).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515',
    )
    expect(screen.getByRole('img', { name: '花萍雨头像' })).toHaveAttribute('src', '/avatar.jpg')

    expect(screen.queryByText('这里放我的自我介绍')).not.toBeInTheDocument()
    expect(screen.queryByText('可替换提示')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: '回到花园' })).toHaveAttribute('href', '/')
  })

  it('renders the projects page as a single-selected summary wall', () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>,
    )

    const firstProject = baseProjects[0]
    const secondProject = baseProjects[1]
    const detailArea = screen.getByLabelText('项目详情')

    expect(screen.getByRole('heading', { name: 'Selected Works / 04 Projects' })).toBeInTheDocument()
    expect(within(detailArea).getByRole('heading', { name: firstProject.title })).toBeInTheDocument()
    expect(within(detailArea).getByRole('heading', { name: '问题' })).toBeInTheDocument()
    expect(within(detailArea).getByRole('heading', { name: '方案' })).toBeInTheDocument()
    expect(within(detailArea).getByRole('heading', { name: '亮点' })).toBeInTheDocument()
    expect(within(detailArea).getByRole('heading', { name: '技术栈' })).toBeInTheDocument()
    expect(within(detailArea).getByRole('heading', { name: '结果' })).toBeInTheDocument()
    expect(within(detailArea).queryByRole('heading', { name: secondProject.title })).not.toBeInTheDocument()
    expect(screen.queryByText('链接计划')).not.toBeInTheDocument()

    expect(screen.getAllByRole('button', { name: /展开 .* 项目档案/ })).toHaveLength(baseProjects.length)
    expect(
      screen.getByRole('button', { name: `展开 ${firstProject.title} 项目档案` }),
    ).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: `展开 ${secondProject.title} 项目档案` }))

    const updatedDetailArea = screen.getByLabelText('项目详情')
    expect(within(updatedDetailArea).getByRole('heading', { name: secondProject.title })).toBeInTheDocument()
    expect(within(updatedDetailArea).getByRole('heading', { name: '问题' })).toBeInTheDocument()
    expect(within(updatedDetailArea).getByRole('heading', { name: '方案' })).toBeInTheDocument()
    expect(within(updatedDetailArea).getByRole('heading', { name: '亮点' })).toBeInTheDocument()
    expect(within(updatedDetailArea).getByRole('heading', { name: '技术栈' })).toBeInTheDocument()
    expect(within(updatedDetailArea).getByRole('heading', { name: '结果' })).toBeInTheDocument()
    expect(within(updatedDetailArea).queryByRole('heading', { name: firstProject.title })).not.toBeInTheDocument()
  })
})
