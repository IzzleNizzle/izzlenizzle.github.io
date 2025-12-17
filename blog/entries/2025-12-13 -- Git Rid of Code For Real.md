## Describe the issue

I think we've all committed by accident a secret to a git repository, and then found it to be non-trivial to remove that from the entire git history.

In git, if you commit a secret or a key, it's there forever. You can remove it, but it will always live in your git history. So it's just covered up, it's not really gone.

For my example, i needed to remove all links of ebay.com from a particular repo. I wanted to just simply search for that domain, and if it matched on a line, i wanted that entire line deleted.

Not just simply deleted, but removed from all git history. Here's how i did that:

## Solution

There are many ways to accomplish this, this is not the only way to do this, nor may all think it is the _correct_ way to do this. But it did for me what i wanted.

### Step 1 - Clone a git mirror

Since it's wise to keep a backup while we are performing this, I did all the work in a mirrored clone.

```
git clone --mirror <repository-url> repo-mirror.git
cd repo-mirror.git
```

### Step 2 - Remove Files/Directories/String matches

#### When i wanted to remove directories completely:

```
git filter-repo --path src/components/UnwantedComponent --invert-paths
```

#### When i wanted to remove by a string match:

The normal syntax for this string-replace is something like

`search-string==>replace-string`

And then the command would be:

`git filter-repo --replace-text ./replacements.txt`

`replacements.txt` being a simple text file i created with the string match syntax.

I wanted to do something a little tricky, i wasn't simply finding and replacing strings. Instead I wanted to look for matches of 'ebay.com' and then remove the entire line. In order to do this i used a regex approach:

`regex:.*secret.example.com.*\n==>`

What this does
.\*secret.example.com.\* → matches the entire line containing the secret

\n → includes the newline so the whole line disappears cleanly

==> with nothing on the right → deletes it

### Step 4 - Push Changes to Remote

`git push --force`

### Step 4 - Confirm removals worked

Search repo and ensure string was removed:

`git rev-list --all | xargs -n 1 git grep -n "ebay.com" || echo "Not found"`

I did find that i had to repeat the "clone/delete/push" steps a couple times to entirely remove everything. But after a few clones, i can now confirm all matches of said string have been removed.

## Conclusion

Yeah so there are likely hundreds of ways to do this, and those that have done this several times may be able to point out more proper ways of performing this. But I found these steps to work for me and it performed a difficult Git task that comes up sometimes.
