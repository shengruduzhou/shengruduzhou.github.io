# UI V2 testing

Static checks performed before publication:

- JavaScript syntax checked with `node --check`.
- CSS parsed with `tinycss2` without stylesheet parse errors.
- Branch file references and Liquid routes were re-read from GitHub after publication.

A final visual check on the deployed GitHub Pages URL is still required because branch previews are not provided by the current deployment workflow.
