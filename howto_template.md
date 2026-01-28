# How to set up this repo as a GitHub template

This guide explains how to **enable** this repository as a GitHub template and how to **create a new repository** from it.

---

## Enabling the template (repo admin)

1. Open the repository on GitHub.
2. Go to **Settings** (repository tabs or dropdown).
3. In the **General** section, check **Template repository**.
4. Save. The main page will then show a **Use this template** button.

Once enabled, anyone with access to the template repo can create new repositories from it.

---

## Creating a new repository from the template

1. On the template repository’s main page, click **Use this template**.
2. Choose **Create a new repository**.
3. Set the **owner**, **repository name**, and **visibility** (public/private).
4. Optionally check **Include all branches** if you need branches other than the default.
5. Click **Create repository**.

GitHub creates a new repo with the same files and a **single initial commit** (no history from the template repo). Then:

- Clone the new repo and follow the main [README](README.md) **Getting started** (install, set `EXPO_PUBLIC_WEBVIEW_URL`, deploy Next.js, run Expo).

---

## Template vs fork

- **Use this template**: New repo with one commit; no link to the template’s history. Best for starting fresh projects from this structure.
- **Fork**: New repo that keeps the full history and stays linked to the original. Use when you want to contribute back or keep history.

You do **not** need to remove or re-init `.git` when using “Use this template”; GitHub creates the new repository for you.
