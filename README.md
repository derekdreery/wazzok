# Wazzok
Git web frontend (issues, ci, reviews, PRs)

## Plan
### Phase 1
 - Web interface for repo management (create, delete, branch, view graph, etc.)
   - Written in React using transpiler. Use immutable design principles & flux
     architecture
 - Rust backend with sensible api calls
   - Required libs
     - git
     - hyper
     - TODO others?
 - Decoupled front/backend
 - Authentication and user management (TODO what auth?)
   - Public keys
 - Role-based access control for repos/admin tasks with users/groups/roles
   model

### Phase 2
 - Git flow based development
 - Code review (merge-based review, work is done on "feature-" branches and
   then merged (review happens here) into development branch as per git flow)
 - CI integration (linting and testing TODO how do I make this as general as
   possible)
   - Linting/compiling ({error, line-number, file etc...})
   - Testing ({Test name, test status, optional message, optional path (for
     test hierarchy)
   - Set up remote as CI which gets pushed to when there are changes - this
     means only changes need to be sent 
   - CI uses api call to report results, which then appear in review process,
     with accept/reject based on results
 - Code/diffs with highlighting/blame for reviewing
 - Auto-deployment (TODO same how do I make this really general - probably just
   push to a location)

### Optional
 - Social features (chat, news feed)
