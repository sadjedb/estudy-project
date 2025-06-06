# eStudy - Student Portal
 
*A Next.js-based student portal with dashboard, course management, and admin panel*

## 🚀 Features
- **Student Dashboard** - View courses, grades, and announcements
- **Course Management** - Browse modules by department
- **Project System** - Submit and track assignments
- **Admin Panel** - Manage students, courses, and content
- **Responsive UI** - Mobile-friendly design
- **Secure Auth** - Role-based access control

## 🛠 Tech Stack
| Category       | Technologies                          |
|----------------|---------------------------------------|
| Frontend       | Next.js 14, React 18, Tailwind CSS   |
| Backend        | Next.js API Routes                   |
| Database       | MySQL                                |
| UI Components  | Custom shadcn/ui-inspired components |
| State Mgmt     | React Hooks                          |

## 📦 Installation
1. Clone repo:
   ```bash
   git clone https://github.com/yourusername/estudy.git
   cd estudy

Install dependencies: npm install

Set up database:

Import public/student_portal_project.sql to MySQL

Configure lib/server/utils/database.js

Create .env.local from example

Run dev server:npm run dev

env file example : 

GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
NEXTAUTH_SECRET="??????"
NEXTAUTH_URL= " / "


DB_HOST= ????
DB_USER= ?????
DB_PASSWORD=?????
DB_NAME=????????


 Access
Role	Default Credentials	Accessible Routes
Student	email: gmail@gmail.comff : gmail@gmail.com	/dashboard, /courses, etc.-----------------
Admin	email: gmail@gmail.com : gmail@gmail.com	/admin, management panels ---------------------

## 📂 Next.js File Structure

```text
.
├── app/
│   ├── (main)/               # Student routes group
│   │   ├── announcments/
│   │   │   └── page.jsx
│   │   ├── contact/
│   │   │   └── page.jsx
│   │   ├── dashboard/
│   │   │   ├── page.jsx
│   │   │   ├── courses/
│   │   │   │   ├── page.jsx
│   │   │   │   └── [module]/
│   │   │   │       └── page.jsx
│   │   │   └── grades/
│   │   │       └── page.jsx
│   │   ├── departments/
│   │   │   ├── page.jsx
│   │   │   └── [department]/
│   │   │       └── page.jsx
│   │   ├── privacy/
│   │   │   └── page.jsx
│   │   ├── profile/
│   │   │   └── page.jsx
│   │   └── projects/
│   │       └── page.jsx
│   ├── admin/
│   │   └── dashboard/
│   │       └── page.jsx
│   ├── api/
│   │   ├── announcements/
│   │   │   └── route.js
│   │   ├── marks/
│   │   │   └── route.js
│   │   ├── modules/
│   │   │   └── route.js
│   │   ├── projects/
│   │   │   └── route.js
│   │   ├── students/
│   │   │   └── route.js
│   │   ├── submit/
│   │   │   └── route.js
│   │   └── whishlist/
│   │       └── route.js
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.jsx
│   ├── page.jsx
│   ├── login/
│   │   └── page.jsx
│   └── unauthorized/
│       └── page.jsx
├── assets/
│   ├── slider1.jpg
│   ├── slider2.jpg
│   └── slider3.jpg
├── components/
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Providers.jsx
│   ├── admin/
│   │   ├── AdminDashboard.jsx
│   │   ├── Announcements/
│   │   │   ├── AnnouncementForm.jsx
│   │   │   ├── AnnouncementItem.jsx
│   │   │   └── AnnouncementList.jsx
│   │   ├── Courses/
│   │   │   └── ModuleManagement.jsx
│   │   ├── Projects/
│   │   │   ├── ProjectForm.jsx
│   │   │   ├── ProjectList.jsx
│   │   │   └── ProjectTableRow.jsx
│   │   ├── Shared/
│   │   │   ├── SearchBar.jsx
│   │   │   └── TabNavigation.jsx
│   │   └── Students/
│   │       ├── StudentForm.jsx
│   │       ├── StudentList.jsx
│   │       └── StudentTableRow.jsx
│   ├── home/
│   │   ├── ContactSection.jsx
│   │   ├── DepartmentsSection.jsx
│   │   ├── Slider.jsx
│   │   └── UrgentAnnouncement.jsx
│   └── ui/
│       ├── alert-dialog.jsx
│       ├── alert.jsx
│       ├── avatar.jsx
│       ├── badge.jsx
│       ├── button.jsx
│       ├── card.jsx
│       ├── checkbox.jsx
│       ├── dialog.jsx
│       ├── input.jsx
│       ├── label.jsx
│       ├── progress.jsx
│       ├── scroll-area.jsx
│       ├── select.jsx
│       ├── separator.jsx
│       ├── skeleton.jsx
│       ├── sonner.jsx
│       ├── table.jsx
│       ├── tabs.jsx
│       ├── textarea.jsx
│       └── tooltip.jsx
├── hooks/
│   ├── useAnnouncements.js
│   ├── useApi.js
│   ├── useMarks.js
│   ├── useModule.js
│   ├── useProject.js
│   ├── useStudent.js
│   ├── useSubmitProject.js
│   └── useWhishlist.js
├── lib/
│   ├── utils.js
│   ├── server/
│   │   ├── services/
│   │   │   ├── AnnouncmentService.js
│   │   │   ├── authUser.js
│   │   │   ├── marksService.js
│   │   │   ├── moduleService.js
│   │   │   ├── projectService.js
│   │   │   ├── studentProjectService.js
│   │   │   ├── studentService.js
│   │   │   └── whishlistService.js
│   │   └── utils/
│   │       └── database.js
│   └── utils/
│       └── withAuth.js
├── public/
│   ├── dep_data.json
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── student_portal_project.sql
│   ├── vercel.svg
│   └── window.svg
├── .env
├── .env.local
├── .gitignore
├── components.json
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── package-lock.json
├── postcss.config.mjs
└── README.md
