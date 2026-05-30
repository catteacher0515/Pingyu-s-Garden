import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import ProfilePage from './ProfilePage'
import ProjectsPage from './ProjectsPage'

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
    expect(screen.getByRole('link', { name: /^项目/ })).toHaveAttribute('href', '/projects')
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

  it('renders the projects page shell and featured placeholder project', () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '项目' })).toBeInTheDocument()
    expect(screen.getByText('代表项目占位卡')).toBeInTheDocument()
    expect(screen.getByText('待补充')).toBeInTheDocument()
  })
})
