# octokit-action

An _experimental_ generic Octokit.js GitHub Action.

## Usage

```yaml
steps:
  - name: Render markdown
    uses: juliangruber/octokit-action@v1
    id: markdown
    with:
      github-token: ${{ secrets.GITHUB_TOKEN }}
      command: markdown.render
      text: '#beep\nboop!'
  - name: Print
    run: echo "${response}"
    env:
      response: ${{ steps.markdown.outputs.response }}
```


## Related

- [find-pull-request-action](https://github.com/juliangruber/find-pull-request-action) &mdash; Approve a Pull Request
- [approve-pull-request-action](https://github.com/juliangruber/approve-pull-request-action) &mdash; Approve a Pull Request
- [merge-pull-request-action](https://github.com/juliangruber/merge-pull-request-action) &mdash; Merge a Pull Request

## License

MIT
