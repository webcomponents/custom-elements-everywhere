# Notes

Since this repo is using `npm`, we have some funny things we gotta do:

Adding the `webcomponents` package can be tricky:

<details><summary>What can go wrong</summary>

```
"webcomponents": "../__shared__/webcomponents",
```
```
"webcomponents": "link:../__shared__/webcomponents",
```
```
"webcomponents": "file:../__shared__/webcomponents",
```

Which result in
```bash
npm error code EUNSUPPORTEDPROTOCOL
npm error Unsupported URL Type "link:": link:../__shared__/webcomponents
npm error A complete log of this run can be found in: /home/nvp/.npm/_logs/2025-03-13T00_06_23_959Z-debug-0.log

```
or
```bash
❯ npm i
npm error Cannot read properties of null (reading 'matches')
npm error A complete log of this run can be found in: /home/nvp/.npm/_logs/2025-03-13T00_36_08_942Z-debug-0.log
```

</details>

To resolve:
```bash
cd ../../
git clean -Xfd
cd libraries/ember
npm i
```
