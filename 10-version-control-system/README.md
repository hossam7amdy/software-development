# Git

## Git Architecture

Git follow 3-Tree Architecture -> (Working Directory + Staging Area + Git Directory)

### System Requirements

- Track everything (files, folders, meta-data, etc.)
- OS Independent and Portable (windows, linux, etc.)
- Track History
- No Content Change

### Git Object (4 parts)

1. Blob -> (file + meta-data)
2. Tree -> (folder + meta-data + structure)
3. Commits -> (commit message + meta-data + parent commit)
4. Tagged Annotation -> (tag name + meta-data + commit)

## GitHub Authentication

1. SSH Key
2. Personal Access Token (username + password)

## Forking GitHub Repository

1. Fork the repository
2. Clone the repository
3. Add upstream remote
4. Sync your fork

## To customize the prompt with Git branching information

**Download the below shell script and place it in your home directory**  
https://github.com/git/git/blob/master/contrib/completion/git-prompt.sh

**Add the content of following script to the end of the ~/.bashrc file and reload your shell using `$source ./~bashrc`**  
https://gist.github.com/danielalvarenga/2df8cabbd6f3041c2378#file-terminal-colors-branch-sh

## Resources

[Git and GitHub | شخبط وانت متطمن](https://youtu.be/Q6G-J54vgKc?si=ilowqKqUgdwrH9w2)
[A Visual Git Reference](https://marklodato.github.io/visual-git-guide/index-en.html)
