---
title: 'Writing Good Commit Messages: A Guide for Effective Version Control'
seoTitle: 'Git, Commit Message'
slug: 'writing-good-commit-message'
description: 'Best practice writing commit message'
pubDate: '2025-01-12'
updatedDate: '2025-01-12'
tags: ["Git","Version Control System","Guide"]
---

In the world of software development, clear and consistent communication is key to maintaining a healthy codebase. One of the most critical yet often overlooked aspects of this communication is writing good commit messages. Commit messages serve as a historical record of changes, helping developers understand the evolution of a project, troubleshoot issues, and collaborate effectively. Poorly written commit messages can lead to confusion, wasted time, and even technical debt.

This guide outlines best practices for writing effective commit messages, tailored to ensure clarity, consistency, and collaboration in your development workflow.

## 1. Structure Your Commit Message

A well-structured commit message provides context and makes it easier for others (or your future self) to understand the changes. A common format includes a **header**, **body**, and optional **footer**:

```
feat(auth): add email-based login

- Implemented API integration for email login
- Added unit tests for validation functions
- Updated UI with login form

Resolves #123
```
- **Header**: A concise summary of the change (50 characters or less).
- **Body**: A detailed description of what was changed and why.
- **Footer**: References to related issues or tickets (e.g., `Resolves #123`).

## 2. Use Descriptive Commit Types

Using standardized commit types helps categorize changes and provides immediate context. Here are some commonly used types:

- **feat**: Adding a new feature
- **fix**: Fixing a bug
- **refactor**: Code refactoring without changing functionality
- **perf**: Performance improvements
- **style**: Code styling (e.g., formatting, missing semi-colons)
- **test**: Adding or updating tests
- **docs**: Documentation changes
- **chore**: Maintenance tasks (e.g., dependency updates)

## 3. Be Concise but Informative

The first line of your commit message should summarize the change in 50 characters or less. If additional context is needed, use the body to provide details. Avoid vague or overly technical language that might confuse readers.
- **Bad**: "Fix bug"
- **Good**: "fix(cart): resolve crash when removing last item"

## 4. Reference Issues or Tickets

Including references to related issues or tickets improves traceability and helps connect changes to specific tasks. Use keywords like:

- <ins> Resolves #123</ins>
- <ins> Closes #456</ins>
- <ins> Related to #789</ins>

This practice ensures that your commits are linked to the broader context of the project.

## 5. Avoid Ambiguity

Vague commit messages like "update code" or "fix issue" provide little value. Instead, be specific about what was changed and why. For example:

- **Bad**: "Fix issue"
- **Good**: "fix(nav): resolve crash when navigating to profile screen"

## 6. Commit Granularity

Aim to commit one logical change at a time. This makes it easier to review, revert, or understand changes later. Avoid bundling unrelated changes into a single commit.

- **Do**: Commit a single feature or bug fix.
- **Avoid**: Combining multiple unrelated changes in one commit.

By following these best practices, you can ensure that your commit messages are clear, informative, and valuable to your team. Remember, good commit messages are not just for others—they’re a gift to your future self, saving you time and effort when revisiting code months or even years later.

## Commit Message Examples for Mobile Developers
Here are some practical examples tailored for mobile development:

**Features**
- **feat(auth): add email-based login**\
Implemented email login functionality with API integration and UI updates.

- **feat(ui): redesign profile screen with new layout**\
Updated the profile screen to match the latest design specifications.

- **feat(api): integrate payment gateway API**\
Added API integration for payment processing with error handling.

**Bug Fixes**
- **fix(nav): resolve crash when navigating to profile screen**\
Fixed an issue where navigating to the profile screen caused app crashes.

- **fix(cart): correct total price calculation for discounts**\
Fixed incorrect calculations when applying multiple discounts.

- **fix(notifications): prevent duplicate push notifications**\
Resolved an issue causing duplicate notifications to appear.

**Refactors**
- **refactor(auth): streamline login logic for better readability**\
Refactored the login module to reduce redundant code.

- **refactor(api): consolidate API endpoints into a single service**\
Merged multiple API endpoint calls into a unified service.

**Performance Improvements**
- **perf(listview): optimize scrolling performance on large datasets**\
Improved ListView rendering by implementing lazy loading.

- **perf(images): reduce image load times by enabling caching**\
Added image caching for better performance in the gallery view.

**Style and Chore**
- **style(app): update button styles to match brand guidelines**\
Adjusted padding and font sizes on buttons to align with branding.

- **chore(dependencies): update Flutter SDK to version 3.10.5**\
Updated the Flutter SDK and resolved associated breaking changes.

**Tests**
- **test(auth): add integration tests for login and registration**\
Added comprehensive tests for email and social media login flows.

- **test(cart): update unit tests for discount application logic**\
Enhanced test coverage for cart discount calculations.

**Documentation**
- **docs(readme): add setup instructions for Firebase integration**\
Updated the README to include Firebase project setup steps.

- **docs(changelog): document changes for version 2.3.0**\
Added release notes highlighting new features and bug fixes.