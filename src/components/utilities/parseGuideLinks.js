import React from 'react'
import GuideLink from './guidelink'

// Regular expression to match [text](page) format
const LINK_REGEX = /\[([^\]]+)\]\(([^)]+)\)/g

export function parseGuideLinks(text) {
    if (!text) return text
    
    const parts = []
    let lastIndex = 0
    
    // Create a new regex for each execution to avoid stateful issues
    const regex = new RegExp(LINK_REGEX)
    let result = regex.exec(text)
    
    while (result !== null) {
        // Add text before the match
        if (result.index > lastIndex) {
            parts.push(text.substring(lastIndex, result.index))
        }

        // Add the GuideLink component
        parts.push(
            React.createElement(GuideLink, {
                key: result.index,
                text: result[1],
                page: result[2]
            })
        )

        lastIndex = result.index + result[0].length
        result = regex.exec(text)
    }

    // Add remaining text
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex))
    }

    // Always wrap in a Fragment to ensure valid React children
    return React.createElement(React.Fragment, { key: 'guide-link-fragment' }, ...parts)
} 