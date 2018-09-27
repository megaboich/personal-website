---
layout: post.njk
title: Setting up Git-Svn from very beginning
date: 2016-04-02
readingTime: 3
collection: posts
tags: 
- Git
- Svn
---
This post is a very short instruction how to set up and configure running git-svn with legacy SVN repository.
<!--cut-->

## Create GIT repository
First of all it is necessary to init GIT repository, clone it from SVN. And it is good to have some number of recent commits.
First of all you need to decide at which starting point you want to have history.
Usually it is useful to have last year or two, if you want more than your local repository might be very big and slow, also it will take a lot of time to get all that from SVN.
First of all we need to check out repository at specific version.

```bash
# checkout a specific revision 217000 which dated October 23, 2014
git svn clone -r 217000 http://url-to-your-svn-repo
```

After some about 15 minutes (depends on your connection to SVN server) you should have local Git repository for that specific version.
Then we are going to update it to the most recent version. This will surely take a lot of time (it can take a week, so please keep calm).

```bash
git svn rebase
```

One more command is to generate .gitignore file from SVN settings.
This step might be not necessary because you probably not the first one running this procedure.
So it might be already .gitignore file committed by one of your colleagues before. Nevertheless this is the command.

```bash
git svn show-ignore > .gitignore
```

## Working on everyday basis
Ok, after you created GIT repository you can work with it in any way you want.
It is very enjoyable to create as many local branches as you want and fast switching between them.
There are many ways to work with Git and this is not a topic of this article.
After finishing your work you should merge all changes to 'git-svn' branch and execute

```bash
git svn dcommit
```

That will push your changes to SVN. If your version is not the latest it will not allow to push changes.
In this case you need to pull latest code from SVN.

```bash
git svn rebase
```

## SVN externals
Workaround: to get svn externals working in git it is possible to get list of all externals via command:

```bash
svn propget svn:externals -R
```

Then you can execute simple powershell script that downloads files from svn to your git repository.

```powershell
Write-host 'Update svn externals. Version 0.0.1'
$ext = 
    @(
        ("build", "url-to-svn-repo"),
        ("AutomatedTestScripts\TestServer\Platform", "url-to-another-svn-repo"),
        ...
        ("Platform\PlatformSDK","url-to-yet-another-svn-repo")
    )
    
$currentLocation = Split-Path -parent $MyInvocation.MyCommand.Definition
$projectRoot = $currentLocation + '\..\..\'
    
Write-Host "R:$projectRoot"
    
foreach($e in $ext){
    $folder = $projectRoot + $e[0];
    $svnPath = $e[1];
    
    Write-Host "======"
    Write-Host $folder 
    Write-Host $svnPath
    
    svn export --force "$svnPath" "$folder"
}
```

And if you don't want to see all these files in uncommited state you shoud add them to your .gitignore file.