import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import ToolsPage from './ToolsPage'

afterEach(() => {
  cleanup()
})

describe('ToolsPage', () => {
  it('renders the tool lab shell and category filters', () => {
    render(
      <MemoryRouter>
        <ToolsPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('Tool Lab')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '小工具实验室' })).toBeInTheDocument()
    expect(screen.getByText('AI + 内容工作流')).toBeInTheDocument()
    expect(screen.getByText('网站 / 脚本 / 飞书流 / Agent / Skill')).toBeInTheDocument()
    expect(screen.getByText('自用优先，慢慢公开')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: '全部' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: '内容工具' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'AI 工作流' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '飞书自动化' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Skill' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '脚本' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '学习工具' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '实验项目' })).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: 'RedBook Fixer' })).toBeInTheDocument()
    expect(screen.getByText('用于小红书文案的初筛并修改工作')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'SoftPage' })).toBeInTheDocument()
    expect(screen.getByText('用于制作小红书图文和封面的内容工具。')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'DraftFlow' })).toBeInTheDocument()
    expect(
      screen.getByText('正在建设中的多平台草稿分发桌面工具，目标是把 Markdown 内容转换并同步到不同内容平台草稿。'),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'publish-guard / content-safety-pipeline' })).toBeInTheDocument()
    expect(
      screen.getByText('一个已归档的小红书发布前内容安全流水线 Skill，串联 RedBook-Fixer、零克查词、小红书草稿和本地日志，用来验证文案过审处理的自动化流程。'),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'GitHub-Star-Top' })).toBeInTheDocument()
    expect(
      screen.getByText('自动抓取每周热门 GitHub 项目，生成 AI 解读并同步到飞书选题池，用来发现优质仓库和支持内容选题。'),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'hermes-gh-demo-tools' })).toBeInTheDocument()
    expect(
      screen.getByText('一组围绕 Hermes CLI 封装的 GitHub 仓库研究脚本，先抓取真实仓库事实，再生成是否值得体验和写作的判断卡。'),
    ).toBeInTheDocument()
    expect(screen.getAllByText('可访问')).toHaveLength(5)
    expect(screen.getAllByText('自用中')).toHaveLength(2)
    expect(screen.getByText('实验中')).toBeInTheDocument()
    expect(screen.getAllByText('网站')).toHaveLength(5)
    expect(screen.getAllByText('脚本')).toHaveLength(2)
    expect(screen.getByText('桌面应用')).toBeInTheDocument()
    expect(screen.getByText('Hermes Agent')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'spring-boot-scaffold-skill' })).toBeInTheDocument()
    expect(
      screen.getByText('用于快速初始化 Spring Boot 后端项目的 Claude Code Skill，会生成统一响应、业务异常、全局异常、CORS 和接口文档等通用脚手架代码。'),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'ShadowPlay / 云上皮影' })).toBeInTheDocument()
    expect(
      screen.getByText('一个围绕唐山皮影文化做的小程序原型，重点在素材整理、文化内容呈现和轻量交互设计。'),
    ).toBeInTheDocument()
    expect(screen.getAllByText('已归档')).toHaveLength(3)
    expect(screen.getAllByText('Skill')).toHaveLength(3)
    expect(screen.getByText('小程序原型')).toBeInTheDocument()
    const toolLinks = screen.getAllByRole('link', { name: '打开工具' })
    const githubLinks = screen.getAllByRole('link', { name: 'GitHub' })

    expect(toolLinks).toHaveLength(5)
    expect(githubLinks).toHaveLength(11)
    expect(toolLinks[0]).toHaveAttribute(
      'href',
      'https://catteacher0515.github.io/cet4-download/',
    )
    expect(toolLinks[1]).toHaveAttribute('href', 'https://catteacher0515.github.io/cet6-download/')
    expect(toolLinks[2]).toHaveAttribute('href', 'https://catteacher0515.github.io/WordTrace/')
    expect(toolLinks[3]).toHaveAttribute('href', 'https://catteacher0515.github.io/RedBook-Fixer/')
    expect(toolLinks[4]).toHaveAttribute('href', 'https://catteacher0515.github.io/SoftPage/')
    expect(githubLinks[0]).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/GitHub-Star-Top',
    )
    expect(githubLinks[1]).toHaveAttribute('href', 'https://github.com/catteacher0515/DraftFlow')
    expect(githubLinks[2]).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/hermes-gh-demo-tools',
    )
    expect(githubLinks[3]).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/ShadowPlay',
    )
    expect(githubLinks[4]).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/cet4-download',
    )
    expect(githubLinks[5]).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/cet6-download',
    )
    expect(githubLinks[6]).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/WordTrace',
    )
    expect(screen.getByRole('heading', { name: '四级真题工具站' })).toBeInTheDocument()
    expect(screen.getByText('直接下载四级真题，无需再在评论区刷 ××')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '六级真题工具站' })).toBeInTheDocument()
    expect(screen.getByText('直接下载六级真题，无需再在评论区刷 ××')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'WordTrace' })).toBeInTheDocument()
    expect(
      screen.getByText('从四六级真题文本中提取、清洗和统计高频词，生成临时抱佛脚用的重点词书和本地学习页面。'),
    ).toBeInTheDocument()
    expect(screen.queryByText('这个分类还在整理中。')).not.toBeInTheDocument()
    expect(screen.queryByText('工具展示占位卡')).not.toBeInTheDocument()
    expect(screen.queryByText(/这里先放一个自用工具展示位/)).not.toBeInTheDocument()
    expect(screen.queryByText(/还没有工具，快去种一个/)).not.toBeInTheDocument()
  })

  it('orders tools by portfolio priority', () => {
    render(
      <MemoryRouter>
        <ToolsPage />
      </MemoryRouter>,
    )

    expect(screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent)).toEqual([
      'GitHub-Star-Top',
      'DraftFlow',
      'hermes-gh-demo-tools',
      'ShadowPlay / 云上皮影',
      '四级真题工具站',
      '六级真题工具站',
      'WordTrace',
      'RedBook Fixer',
      'SoftPage',
      'publish-guard / content-safety-pipeline',
      'spring-boot-scaffold-skill',
    ])
  })

  it('keeps category selection state when switching empty categories', () => {
    render(
      <MemoryRouter>
        <ToolsPage />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'AI 工作流' }))

    expect(screen.getByRole('button', { name: 'AI 工作流' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: '全部' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.queryByText('RedBook Fixer')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'DraftFlow' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'GitHub-Star-Top' })).toBeInTheDocument()
    expect(screen.queryByText('这个分类还在整理中。')).not.toBeInTheDocument()

    expect(screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent)).toEqual([
      'GitHub-Star-Top',
      'DraftFlow',
      'hermes-gh-demo-tools',
    ])
  })

  it('shows RedBook Fixer under content tools', () => {
    render(
      <MemoryRouter>
        <ToolsPage />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: '内容工具' }))

    expect(screen.getByRole('button', { name: '内容工具' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('heading', { name: 'RedBook Fixer' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'SoftPage' })).toBeInTheDocument()
    expect(screen.getByText('用于制作小红书图文和封面的内容工具。')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'DraftFlow' })).toBeInTheDocument()
    expect(screen.getByText('实验中')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'publish-guard / content-safety-pipeline' })).toBeInTheDocument()
    expect(screen.getAllByText('已归档')).toHaveLength(1)
    const toolLinks = screen.getAllByRole('link', { name: '打开工具' })
    const githubLinks = screen.getAllByRole('link', { name: 'GitHub' })

    expect(toolLinks).toHaveLength(2)
    expect(toolLinks[0]).toHaveAttribute(
      'href',
      'https://catteacher0515.github.io/RedBook-Fixer/',
    )
    expect(toolLinks[1]).toHaveAttribute('href', 'https://catteacher0515.github.io/SoftPage/')
    expect(githubLinks).toHaveLength(4)
    expect(githubLinks[0]).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/DraftFlow',
    )
    expect(githubLinks[1]).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/RedBook-Fixer',
    )
    expect(githubLinks[2]).toHaveAttribute('href', 'https://github.com/catteacher0515/SoftPage')
    expect(githubLinks[3]).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/publish-guard',
    )
    expect(screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent)).toEqual([
      'DraftFlow',
      'RedBook Fixer',
      'SoftPage',
      'publish-guard / content-safety-pipeline',
    ])
  })

  it('shows CET tools under study tools with site and GitHub links', () => {
    render(
      <MemoryRouter>
        <ToolsPage />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: '学习工具' }))

    expect(screen.getByRole('button', { name: '学习工具' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.queryByText('RedBook Fixer')).not.toBeInTheDocument()

    expect(screen.getByRole('heading', { name: '四级真题工具站' })).toBeInTheDocument()
    expect(screen.getByText('直接下载四级真题，无需再在评论区刷 ××')).toBeInTheDocument()
    const toolLinks = screen.getAllByRole('link', { name: '打开工具' })
    const githubLinks = screen.getAllByRole('link', { name: 'GitHub' })

    expect(toolLinks).toHaveLength(3)
    expect(githubLinks).toHaveLength(3)
    expect(toolLinks[0]).toHaveAttribute(
      'href',
      'https://catteacher0515.github.io/cet4-download/',
    )
    expect(githubLinks[0]).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/cet4-download',
    )

    expect(screen.getByRole('heading', { name: '六级真题工具站' })).toBeInTheDocument()
    expect(screen.getByText('直接下载六级真题，无需再在评论区刷 ××')).toBeInTheDocument()
    expect(toolLinks[1]).toHaveAttribute(
      'href',
      'https://catteacher0515.github.io/cet6-download/',
    )
    expect(githubLinks[1]).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/cet6-download',
    )
    expect(screen.getByRole('heading', { name: 'WordTrace' })).toBeInTheDocument()
    expect(
      screen.getByText('从四六级真题文本中提取、清洗和统计高频词，生成临时抱佛脚用的重点词书和本地学习页面。'),
    ).toBeInTheDocument()
    expect(toolLinks[2]).toHaveAttribute('href', 'https://catteacher0515.github.io/WordTrace/')
    expect(githubLinks[2]).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/WordTrace',
    )
    expect(screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent)).toEqual([
      '四级真题工具站',
      '六级真题工具站',
      'WordTrace',
    ])
  })

  it('shows archived ShadowPlay under experiment projects with GitHub only', () => {
    render(
      <MemoryRouter>
        <ToolsPage />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: '实验项目' }))

    expect(screen.getByRole('button', { name: '实验项目' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.queryByText('RedBook Fixer')).not.toBeInTheDocument()
    expect(screen.queryByText('四级真题工具站')).not.toBeInTheDocument()

    expect(screen.getByRole('heading', { name: 'ShadowPlay / 云上皮影' })).toBeInTheDocument()
    expect(
      screen.getByText('一个围绕唐山皮影文化做的小程序原型，重点在素材整理、文化内容呈现和轻量交互设计。'),
    ).toBeInTheDocument()
    expect(screen.getByText('已归档')).toBeInTheDocument()
    expect(screen.getByText('小程序原型')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '打开工具' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/ShadowPlay',
    )
    expect(screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent)).toEqual([
      'ShadowPlay / 云上皮影',
    ])
  })

  it('shows archived backend scaffold under skill category with GitHub only', () => {
    render(
      <MemoryRouter>
        <ToolsPage />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Skill' }))

    expect(screen.getByRole('button', { name: 'Skill' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('heading', { name: 'spring-boot-scaffold-skill' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'publish-guard / content-safety-pipeline' })).toBeInTheDocument()
    expect(
      screen.getByText('用于快速初始化 Spring Boot 后端项目的 Claude Code Skill，会生成统一响应、业务异常、全局异常、CORS 和接口文档等通用脚手架代码。'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('一个已归档的小红书发布前内容安全流水线 Skill，串联 RedBook-Fixer、零克查词、小红书草稿和本地日志，用来验证文案过审处理的自动化流程。'),
    ).toBeInTheDocument()
    expect(screen.getAllByText('已归档')).toHaveLength(2)
    expect(screen.getAllByText('Skill')).toHaveLength(3)
    expect(screen.queryByRole('link', { name: '打开工具' })).not.toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'GitHub' })[0]).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/publish-guard',
    )
    expect(screen.getAllByRole('link', { name: 'GitHub' })[1]).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/spring-boot-scaffold-skill',
    )
    expect(screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent)).toEqual([
      'publish-guard / content-safety-pipeline',
      'spring-boot-scaffold-skill',
    ])
  })

  it('shows GitHub workflow tools under AI workflow and script categories', () => {
    render(
      <MemoryRouter>
        <ToolsPage />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'AI 工作流' }))

    expect(screen.getByRole('button', { name: 'AI 工作流' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('heading', { name: 'DraftFlow' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'GitHub-Star-Top' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'hermes-gh-demo-tools' })).toBeInTheDocument()
    expect(screen.getAllByText('自用中')).toHaveLength(2)
    expect(screen.getAllByText('脚本')).toHaveLength(2)
    expect(screen.queryByRole('link', { name: '打开工具' })).not.toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'GitHub' })[0]).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/GitHub-Star-Top',
    )
    expect(screen.getAllByRole('link', { name: 'GitHub' })[1]).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/DraftFlow',
    )
    expect(screen.getAllByRole('link', { name: 'GitHub' })[2]).toHaveAttribute(
      'href',
      'https://github.com/catteacher0515/hermes-gh-demo-tools',
    )

    fireEvent.click(screen.getByRole('button', { name: '飞书自动化' }))

    expect(screen.getByRole('button', { name: '飞书自动化' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('heading', { name: 'GitHub-Star-Top' })).toBeInTheDocument()
    expect(screen.queryByText('hermes-gh-demo-tools')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: '脚本' }))

    expect(screen.getByRole('button', { name: '脚本' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('heading', { name: 'GitHub-Star-Top' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'hermes-gh-demo-tools' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'WordTrace' })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent)).toEqual([
      'GitHub-Star-Top',
      'hermes-gh-demo-tools',
      'WordTrace',
    ])
  })
})
