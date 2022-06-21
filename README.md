# Smart Contract Linear Vesting TypeScript Package

### Install dependencies

Install dependencies with npm:

```bash
npm i
```

### Write your code

Make necessary changes in **package.json** (name, version, description, keywords, author, homepage and other URLs).

Write your code in **src** folder, and unit test in **test** folder, replacing the original files there.

The VS Code shortcuts for formatting of a code file are: <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>F</kbd> (Windows); <kbd>Shift</kbd> + <kbd>Option (Alt)</kbd> + <kbd>F</kbd> (MacOS); <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd> (Linux).

Change code linting and formatting settings in **.prettierrc.js** if you want.

### Test

Test your code with Jest framework:

```bash
npm run test
```

**Note:** Example TypeScript Package uses [husky](https://typicode.github.io/husky/), [pinst](https://github.com/typicode/pinst) and [commitlint](https://commitlint.js.org/) to automatically execute test and [lint commit message](https://www.conventionalcommits.org/) before every commit.

### Build

Build production (distribution) files in your **dist** folder:

```bash
npm run build
```

It generates CommonJS (in **dist/cjs** folder), ES Modules (in **dist/esm** folder), bundled and minified UMD (in **dist/umd** folder), as well as TypeScript declaration files (in **dist/types** folder).

### Try it before publishing

Run:

```bash
npm link
```

[npm link](https://docs.npmjs.com/cli/v6/commands/npm-link) will create a symlink in the global folder, which may be **{prefix}/lib/node_modules/smart-contract-linear-vesting** or **C:\Users\<username>\AppData\Roaming\npm\node_modules\smart-contract-linear-vesting**.

Create an empty folder elsewhere, you don't even need to `npm init` (to generate **package.json**). Open the folder with VS Code, open a terminal and just run:

```bash
npm uninstall smart-contract-linear-vesting -g
```

### Prepare to publish

Create an [npm](https://www.npmjs.com/) account.

<details><summary><strong>Click to read this section if you do manual publishing</strong></summary>

#### Manual publishing to npm

Log in:

```bash
npm adduser
```

And publish:

```bash
npm publish
```

</details>

### API doc:
##### Functions:
+ handleWeb3Provider: () => Promise<any>;

+ handleGetDetailInfoAddress: (pool: string, account: string) => Promise<{
  address: string;
  amount: number;
  claimed: number;
  claimable: number;
  remain: number;
} | null>;

+ handleGetErc20Balance: (account: string, token: string) => Promise<number>;

+ handleClaim: (address?: string) => Promise<any>;

+ handleChangeStakeholder: (prevStakeholder: string, newStakeholder: string, address?: string) => Promise<any>;

+ handleApproveStakeholders: (poolAddress: string, token?: string, amount?: number) => Promise<any>;

+ handleAddStakeholders: (poolAddress: string, amountList?: never[]) => Promise<any>;

+ handleCreatePool: (name: string, token: string, start: number, duration: number) => Promise<any>;

+ handleTransferOwnership: (poolAddress: string, valueAddress: string) => Promise<any>;

+ handleAddManager: (poolAddress: string, token: string, itemManager: string) => Promise<any>;

+ handleRemoveManager: (poolAddress: string, token: string, itemManager: string) => Promise<any>;

#### Using:
    const { handleGetErc20Balance } = new SmartContractLinearVesting()

    (async () => {
      const balance = await handleGetErc20Balance(account, process.env.REACT_APP_TOKEN_ADDRESS || '')
      balance && dispatch(updateErc20Balance(balance))
    })()
