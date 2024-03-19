import Link from 'next/link';
import React from 'react';
import { GithubOutlined } from '@ant-design/icons'
const Footer = () => {

    const footerLinks = [
        {
            link: 'https://docs.github.com/en/site-policy/github-terms/github-terms-of-service',
            name: 'Terms',
        },
        {
            link: 'https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement',
            name: 'Privacy',
        },
        {
            link: 'https://github.com/security',
            name: 'Security',
        },
        {
            link: 'https://www.githubstatus.com/',
            name: 'Status',
        },
        {
            link: 'https://docs.github.com/en',
            name: 'Docs',
        },
        {
            link: 'https://support.github.com/?tags=dotcom-footer',
            name: 'Contact GitHub',
        },
        {
            link: 'https://github.com/pricing',
            name: 'Pricing',
        },
        {
            link: 'https://docs.github.com/en',
            name: 'API',
        },
        {
            link: 'https://github.com/services/',
            name: 'Trining',
        },
        {
            link: 'https://github.blog/',
            name: 'Blog',
        },
        {
            link: 'https://github.com/about',
            name: 'About',
        },
    ]


    return (
        <footer className='footer'>
            <div className='footer_div'>
                <div className='github_log_div'>
                    <Link href='/' className='home_icon' >
                        <GithubOutlined className='githubOutlined' />
                    </Link>
                    <p className='github_inc'>© 2023 GitHub, Inc.</p>
                </div>
                <div className='footerLinks'>
                    {footerLinks.map((footerLink, index) => {
                        return (
                            <div key={index}>
                                <Link href={footerLink.link}
                                    className='link'
                                >
                                    {footerLink.name}
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </footer>
    )
}

export default Footer;