## Overview
This is the frontend application for the Employee Performance Review system. Built with Next.js and TailwindCSS, it provides an interface for administrators and employees to manage performance reviews and feedback.

## **Pages and URLs**
### **Admin Pages**
1. **Login Page**: `/admin/login`
   - URL: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
   - Description: Admin login page.

2. **Admin Panel**: `/admin`
   - URL: [http://localhost:3000/admin](http://localhost:3000/admin)
   - Description: Panel for administrators to manage employees, reviews, and feedback.

### **Employee Pages**
1. **Employee Dashboard**: `/employee`
   - URL: [http://localhost:3000/employee](http://localhost:3000/employee)
   - Description: Dashboard for employees to view assigned reviews and participation tasks.

---

## **How to Run the Project Locally**

### **Requirements**
- Node.js (v18 or higher)
- NPM or Yarn
- Docker (optional, for containerized deployment)

### **Steps**
1. Clone the repository:
```bash
git clone https://github.com/IMingGarson/homework-frontend.git

cd homework-frontend

yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
