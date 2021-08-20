## 💡 Contributing

ULinks follows Gitflow. We practice CI/CD where we continuously deploy off of main and use develop for feature work/integration.

```
──────────────────────── main ────────────────────────────────────    # Deployments
        │                                   │
        └───────────── develop ─────────────                          # Development work
            │                           │
            └────── feat/[feat-name] ───                              # Feature branches
```

Dev branches should be appended with an indicator to describe the type of work being done, including but not limited to:
feat, hot-fix, refactor, tweak, docs, chore

For internal team:
1. Clone the repo
2. See featurework

For open source contributors:
1. Fork the repo
2. `git remote add upstream https://github.com/jcserv/ulinks/`
3. `git fetch upstream`
4. `git rebase upstream/develop`
5. See featurework

Frontend Acceptance Criteria:
1. It should be properly linted/formatted (`yarn run format`)
2. Adequate automated test coverage (WIP)
3. Basic manual QA & accessibility checks with Axe
4. Constants should be placed in a constants file
5. All text should be intl-ize'd

## ⛏️ Featurework:

1. `git checkout -b feat/[feat-name]`
2. Write your code
3. `git add --all`
4. `git status` - Check that any unwanted files are not being committed
5. `git commit -m [some present-tense, descriptive message about the work completed]`
6. `git push`
7. Open a PR from that branch to develop (in the main repo)
8. Fill out the pull request template accordingly
9. To be approved, code must have adequate test coverage + formatted properly
10. Commits should be squashed when merged