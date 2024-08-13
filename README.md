## Added components to Shadcn

- The Icon component (So I don't have to always set the default height and width)

## Changes to the Shadcn default components

### dropdown-menu

#### dropdown-menu-content

Make it possible to disable the portal feature of the dropdown-menu component.

So, I have added a prop called `withPortal` to the dropdown-menu component. If `withPortal` is set to `false`, the dropdown-menu will not be rendered in a portal.

#### dropdown-menu-item

Make is possible to mark a dropdown-menu-item as active.
