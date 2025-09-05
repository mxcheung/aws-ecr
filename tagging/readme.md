🔹 1. CodeCommit Example

When your build is triggered from a branch:

```
echo $CODEBUILD_RESOLVED_SOURCE_VERSION
echo $CODEBUILD_SOURCE_VERSION
```

In CodeBuild, you can get the branch name from CodeCommit builds, 
but it’s a little tricky because CodeBuild doesn’t inject a direct $BRANCH variable.

```
BRANCH_NAME=$(echo $CODEBUILD_SOURCE_VERSION | sed 's|refs/heads/||')
echo "Branch = $BRANCH_NAME"
```
