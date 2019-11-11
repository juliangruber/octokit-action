# octokit-action

An _experimental_ generic Octokit.js GitHub Action.

## Usage

```yaml
steps:
  - name: Find open Pull Requests
    uses: juliangruber/octokit-action@v1
    id: find-pull-request
    with:
      github-token: ${{ secrets.GITHUB_TOKEN }}
      command: pulls.list
      state: open
  - name: Report
    run: echo "Your have ${count} open Pull Requests"
    env:
      count: ${{ steps.find-pull-request.outputs.response.length }}
```


## Related

- [find-pull-request-action](https://github.com/juliangruber/find-pull-request-action) &mdash; Approve a Pull Request
- [approve-pull-request-action](https://github.com/juliangruber/approve-pull-request-action) &mdash; Approve a Pull Request
- [merge-pull-request-action](https://github.com/juliangruber/merge-pull-request-action) &mdash; Merge a Pull Request

## License

MIT
