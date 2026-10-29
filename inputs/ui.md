# UI

The prototype is sourced from `.uploads/prototype.html`, titled **Orchard Core CMS — CodeForensics v1.1.4**. Its brand colour is `#0F62FE` (IBM Blue / `--color-primary`). The typeface declared in the design tokens is **IBM Plex Sans, Helvetica Neue, Arial, sans-serif**; the components and body text render with **system-ui, -apple-system, "Segoe UI", Roboto, sans-serif**.

## Colour palette

| Role | Colour | Variable | Used for |
|------|--------|----------|----------|
| text | `#445069` | `--ink-3` | text ×16 |
| error | `#C0392B` | `--danger` | text ×15 |
| background | `#FDF5F5` | `--danger-bg-2` | background ×15 |
| border | `#EDDADA` | `--danger-line-2` | border ×15 |
| surface | `#F4F4F4` | `--color-surface`, `--surface` | text ×3, background ×11 |
| primary | `#0F62FE` | `--color-primary`, `--accent`, `--navy-2` | background ×2, text ×10, border ×1 |
| border | `#D3DBE6` | `--line-btn` | border ×9 |
| text | `#1A2740` | `--ink-1` | text ×8 |
| success | `#0F7A4D` | `--ok-ink` | text ×7 |
| success | `#E6F4EC` | `--ok-bg` | background ×7 |
| success | `#BFE0CC` | `--ok-line` | border ×7 |
| background | `#FFFFFF` | `--bg`, `--color-background`, `--on-dark` | background ×4, border ×1 |
| text | `#7A879C` | `--muted-2` | text ×5 |
| text | `#A9BAD4` | `--on-navy-dim-3` | text ×4 |
| primary | `#0043CE` | `--color-primary-dark`, `--navy` | background ×1, text ×1 |
| text | `#525252` | `--color-text-muted`, `--muted` | text ×2 |
| text | `#9FB2CF` | `--on-navy-dim-2` | text ×1 |
| border | `#C6C6C6` | `--border`, `--color-border` | border ×1 |
| background | `#F6F8FB` | `--wash` | background ×1 |
| warning | `#8A5A00` | `--amber` | text ×1 |
| warning | `#FBF1DC` | `--warn-bg` | background ×1 |
| warning | `#EED9A8` | `--warn-line` | border ×1 |

## Typography

Typeface (body): **system-ui, -apple-system, "Segoe UI", Roboto, sans-serif**

| Size | Weight | Used on |
|------|--------|---------|
| 12px (`--font-size-xs`) | — | labels, captions |
| 13px | 600 | primary button |
| 13.3333px | 400 | brand button |
| 14px (`--font-size-sm`) | — | secondary text |
| 15px (`--font-size-base`) | — | body text |
| 16px | 400 | card body, navigation items, tab links |
| 16px | 500 | active tab link |
| 18px (`--font-size-lg`) | — | sub-headings |
| 20px (`--font-size-xl`) | — | section headings |
| 24px (`--font-size-2xl`) | — | page headings |

## Spacing, radii and elevation

### Spacing

| Variable | Value |
|----------|-------|
| `--spacing-xs` | 4px |
| `--spacing-sm` | 8px |
| `--spacing-md` | 16px |
| `--spacing-lg` | 24px |
| `--spacing-xl` | 32px |

### Radii

| Variable | Value |
|----------|-------|
| `--border-radius` | 0px |
| `--r-sm` | 7px |
| `--r-md` | 9px |
| `--r-lg` | 12px |
| `--r-pill` | 20px |

Radii used in prototype: button primary top-left `8px`; card top-left `12px`.

### Shadows

| Variable | Value |
|----------|-------|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,.12)` |
| `--shadow-md` | `0 2px 8px rgba(0,0,0,.15)` |
| `--shadow-lg` | `0 8px 32px rgba(0,0,0,.25)` |
| `--shadow-card` | `0 1px 2px rgba(16,32,60,.04)` |
| `--shadow-pop` | `0 10px 30px rgba(16,32,60,.16)` |
| `--shadow-modal` | `0 24px 70px rgba(10,22,44,.34)` |

Shadow used in prototype: card uses `rgba(16, 32, 60, 0.04) 0px 1px 2px 0px` (`--shadow-card`); button primary has `none`.

## Components

### Primary Button

![Primary Button](build/ui/components/button_primary.png)

| Property | Value |
|----------|-------|
| Tag | `<button>` |
| Classes | `btn btn-primary` |
| Color | `#F4F4F4` |
| Background | `#0F62FE` |
| Border top color | `#0F62FE` |
| Border top width | 1px |
| Border top-left radius | 8px |
| Font family | system-ui, -apple-system, "Segoe UI", Roboto, sans-serif |
| Font size | 13px |
| Font weight | 600 |
| Padding top | 10px |
| Padding left | 16px |
| Box shadow | none |
| Height | 38px |

### Brand Button

![Brand Button](build/ui/components/button.png)

| Property | Value |
|----------|-------|
| Tag | `<button>` |
| Classes | `brand` |
| Color | `#F4F4F4` |
| Background | transparent |
| Border top color | `#F4F4F4` |
| Border top width | 0px |
| Border top-left radius | 0px |
| Font family | system-ui, -apple-system, "Segoe UI", Roboto, sans-serif |
| Font size | 13.3333px |
| Font weight | 400 |
| Padding top | 0px |
| Padding left | 0px |
| Box shadow | none |
| Height | 30px |

### Card

![Card](build/ui/components/card.png)

| Property | Value |
|----------|-------|
| Tag | `<div>` |
| Classes | `card` |
| Color | `#161616` |
| Background | `#F4F4F4` |
| Border top color | `#C6C6C6` |
| Border top width | 1px |
| Border top-left radius | 12px |
| Font family | system-ui, -apple-system, "Segoe UI", Roboto, sans-serif |
| Font size | 16px |
| Font weight | 400 |
| Padding top | 16px |
| Padding left | 16px |
| Box shadow | rgba(16, 32, 60, 0.04) 0px 1px 2px 0px |
| Height | 575px |

### Navigation

![Navigation](build/ui/components/navigation.png)

| Property | Value |
|----------|-------|
| Tag | `<nav>` |
| Classes | `nav` |
| Color | `#F4F4F4` |
| Background | transparent |
| Border top color | `#F4F4F4` |
| Border top width | 0px |
| Border top-left radius | 0px |
| Font family | system-ui, -apple-system, "Segoe UI", Roboto, sans-serif |
| Font size | 16px |
| Font weight | 400 |
| Padding top | 0px |
| Padding left | 0px |
| Box shadow | none |
| Height | 30px |

### Link / Tab

![Link / Tab](build/ui/components/link.png)

| Property | Value |
|----------|-------|
| Tag | `<a>` |
| Classes | `proto-tab active` |
| Color | `#0F62FE` |
| Background | transparent |
| Border top color | `#0F62FE` |
| Border top width | 0px |
| Border top-left radius | 0px |
| Font family | system-ui, -apple-system, "Segoe UI", Roboto, sans-serif |
| Font size | 16px |
| Font weight | 500 |
| Padding top | 10px |
| Padding left | 14px |
| Box shadow | none |
| Height | 40px |

## Layout

The shell is a three-region layout: a fixed top header, a fixed left navigation sidebar, and a scrollable content area.

| Shell variable | Value |
|----------------|-------|
| `--shell-header-height` | 56px |
| `--shell-nav-width` | 260px |
| `--shell-status-height` | 32px |
| `--z-chrome` | 20 |
| `--z-dialog` | 30 |

- **Header**: 56px tall, spans full width; contains the Brand Button (`#F4F4F4` on transparent) and the top Navigation component (`#F4F4F4`, transparent background). Sits at z-index 20.
- **Left sidebar navigation**: 260px wide, lists section links (Security, Content, Tenants, Configuration, Account).
- **Content area**: remaining space to the right of the sidebar; cards use `#F4F4F4` background with 1px `#C6C6C6` border.

## Screens

### Site Setup (`site-setup`)

![Site Setup](build/ui/screens/pages/01/image-1.png)

Solution screen: SCR-site-setup

---

### Login (`login`)

![Login](build/ui/screens/pages/02/image-1.png)

Solution screen: SCR-login

---

### Register (`register`)

![Register](build/ui/screens/pages/03/image-1.png)

Solution screen: SCR-register

---

### Users Administration (`users-admin`)

![Users Administration](build/ui/screens/pages/04/image-1.png)

Solution screen: SCR-users-admin

---

### Roles List (`roles-list`)

![Roles List](build/ui/screens/pages/05/image-1.png)

Solution screen: SCR-roles-list

---

### Create Role (`role-create`)

![Create Role](build/ui/screens/pages/06/image-1.png)

Solution screen: SCR-role-create

---

### Edit Role (`role-edit`)

![Edit Role](build/ui/screens/pages/07/image-1.png)

Solution screen: SCR-role-edit

---

### Clone Role (`role-clone`)

![Clone Role](build/ui/screens/pages/08/image-1.png)

Solution screen: SCR-role-clone

---

### Content Admin List (`content-admin-list`)

![Content Admin List](build/ui/screens/pages/09/image-1.png)

Solution screen: SCR-content-admin-list

---

### Content Item Editor (`content-edit`)

![Content Item Editor](build/ui/screens/pages/10/image-1.png)

Solution screen: SCR-content-edit

---

### Content Item Display (`content-display`)

![Content Item Display](build/ui/screens/pages/11/image-1.png)

Solution screen: SCR-content-display

---

### Content Types Administration (`content-types`)

![Content Types Administration](build/ui/screens/pages/12/image-1.png)

Solution screen: SCR-content-types

---

### Edit Content Part (`content-type-edit-part`)

![Edit Content Part](build/ui/screens/pages/13/image-1.png)

Solution screen: SCR-content-type-edit-part

---

### Add Field to Content Part (`content-type-add-field`)

![Add Field to Content Part](build/ui/screens/pages/14/image-1.png)

Solution screen: SCR-content-type-add-field

---

### Tenant Administration (`tenant-admin`)

![Tenant Administration](build/ui/screens/pages/15/image-1.png)

Solution screen: SCR-tenant-admin

---

### Create Tenant (`tenant-create`)

![Create Tenant](build/ui/screens/pages/16/image-1.png)

Solution screen: SCR-tenant-create

---

### Features Administration (`features`)

![Features Administration](build/ui/screens/pages/17/image-1.png)

Solution screen: SCR-features

---

### User Profile (`user-profile`)

![User Profile](build/ui/screens/pages/18/image-1.png)

Solution screen: SCR-user-profile

---

### Deployment Plans (`deployment-plans`)

![Deployment Plans](build/ui/screens/pages/19/image-1.png)

Solution screen: SCR-deployment-plans

---

### Queries Administration (`queries-admin`)

![Queries Administration](build/ui/screens/pages/20/image-1.png)

Solution screen: SCR-queries-admin

---

### Security Settings (`security-settings`)

![Security Settings](build/ui/screens/pages/21/image-1.png)

Solution screen: SCR-security-settings
