View 1: The Entry Portal
The Entry Portal serves as the critical routing mechanism for the entire LuppoGrove ecosystem. Because the platform operates as a dual-sided marketplace, the login interface must immediately segment users into their appropriate architectural silos: academia versus industry.

Figma Design Prompt: The Entry Portal
Copy and paste the following prompt into your Figma AI tool or provide it directly to a UI designer:

"Generate a high-fidelity React UI for a login page called 'LuppoGrove'. The design must strictly adhere to a 'Nordic Minimalism' design system. Do not deviate from these aesthetic tokens.

AESTHETIC TOKENS:

Global Background: Warm Neutral (#fafaf9).

Primary Brand Color: Calm Green (#2d5a47).

Surface: Pure White (#ffffff) for the central card.

Typography: Inter (sans-serif), crisp and highly legible.

Border Radius: Soft (16px) for the card, and 12px for buttons.

Elevation: Subtle drop shadow on the main card (0 8px 24px rgba(0,0,0,0.04)).

LAYOUT & AUTO-LAYOUT STRUCTURE:

Set the root frame to a desktop resolution (1440x1024). Apply Auto-Layout: Flex Direction = Column, Align Items = Center, Justify Content = Center. Background color: #fafaf9.

Create the 'Authentication Card' component in the center. Width: 480px. Padding: 48px all around. Background: #ffffff. Border Radius: 16px. Shadow: 0 8px 24px rgba(0,0,0,0.04).

Inside the Card (Auto-Layout Column, Gap 32px):

Top Section: Render a minimalist typographic logo reading 'LuppoGrove' in 24px Inter Bold, colored #2d5a47.

Header Section (Gap 8px): A heading reading 'Welcome to the Collaboration Ecosystem' (Inter SemiBold, 28px, Dark Gray). Below it, a subdued subtitle reading 'Choose your portal to continue.' (Inter Regular, 16px, Medium Gray).

Action Section (Gap 16px): Create two large, full-width SSO buttons. Do NOT include standard email or password input fields.

BUTTON SPECIFICATIONS:

Button 1 (University/Haka Routing): Height 56px. Background: #2d5a47. Text: 'University Login (Microsoft)'. Text Color: #ffffff. Include a subtle, minimalist graduation cap or university building icon on the left.

Button 2 (Industry Routing): Height 56px. Background: Transparent. Border: 2px solid #2d5a47. Text: 'Industry Login (Google/Gmail)'. Text Color: #2d5a47. Include a minimalist Google 'G' or briefcase icon on the left.

INTERACTION STATES:

Define a hover state variant for the buttons: On hover, the button elevates via a -2px Y-axis translation and the drop shadow increases to (0 4px 12px rgba(45,90,71,0.2)).

Footer: Below the buttons, add a centered, 12px light gray text reading: 'By authenticating, you agree to the LuppoGrove Terms of Service.'

Ensure the layout utilizes responsive auto-layout properties mirroring standard Material UI (MUI) Box and Stack components."View 2: The Company View (Dashboard & Gallery)
Upon authenticating via the Industry portal, corporate users arrive at the Company View.

Gallery Updates: The main content area explicitly lists the exact requested projects without any NDA markers. The filter buttons are placed immediately beneath the "Available Project Proposals" title. All boxes are fully functional, routing users to a detailed Project Overview page.

Figma Design Prompt: The Company View
Copy and paste the following prompt into your Figma AI tool or provide it directly to a UI designer:

"Generate a high-fidelity React dashboard UI for 'LuppoGrove' representing the 'Company View'. Use a Nordic Minimalism design system.

AESTHETIC TOKENS:

Global Canvas: Warm Neutral (#fafaf9).

Sidebar & Cards: Pure White (#ffffff).

Primary Action Color: Calm Green (#2d5a47).

Typography: Inter. Component Radius: 12px to 16px.

MACRO LAYOUT STRUCTURE:
Implement a full-screen application layout with a fixed left sidebar (Width: 260px) and a fluid main content area.

THE SIDEBAR (Team Management & Navigation):

Background: #ffffff with a subtle 1px light gray right border. Padding: 24px.

Top: LuppoGrove logo.

Middle (Navigation Menu): 'Browse Courses' (Active). 'My Proposals' (Inactive). 'Active Projects' (Inactive).

Bottom ('Company Team'): Header: 'Team Hierarchy'. List 3 user components with 32px avatars: 'Alex Chen (Owner)', 'Maria Santos (Co-owner)', 'David Lee (Developer)'.

MAIN CONTENT AREA (Top Section: Full-Width Gantt Timeline):

Padding: 40px 40px 0 40px. Width: 100%.The Timeline Canvas (White card, 16px radius, padding 32px):

HEADER ROW: Left side text 'Strategic Partnership Timelines' (24px, Bold, Dark Blue/Gray). Right side: A pill-style toggle group: < | Spring 2025 | Fall 2025 | Spring 2026 | Fall 2026 (Dark Green Pill) | >.

TABLE HEADER: 'Course / Program', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'.

Row 1: 'Aalto: SW Project'. Light blue bar, 4 blue Diamonds (◇).

Row 2: 'Helsinki: OHTU'. Light purple bar, 2 purple Diamonds.

Row 3 (Highlighted): 'LUT: Capstone'. Light green bar, 4 green Diamonds.

MAIN CONTENT AREA (Bottom Section: Centered Course Gallery):

Padding: 40px.

Top Header: 'Available Project Proposals' (24px, Bold).

Topic Filter Bar (Directly under the title): Pill buttons for 'Software', 'Service Design', 'Data Analytics', 'AI'.

Gallery Grid: A responsive grid layout (Auto-Layout Wrap, Justify Content: Center, Gap 32px).

COURSE CARD COMPONENTS (NO NDA MARKERS):

Card Anatomy: Width 340px. Height 420px. Background #ffffff. Radius 16px. Image Header (140px).

EXACT DATA TO POPULATE:

Card 1: Title: 'Predictive Maintenance Algorithm'. Sub: 'Konecranes Ltd.' Detail: '12 Weeks • Software Engineering'.

Card 2: Title: 'Customer Behavior Analytics Dashboard'. Sub: 'Nordea Bank'. Detail: '10 Weeks • Data Analytics'.

Card 3: Title: 'AI-Powered Content Moderation'. Sub: 'Supercell'. Detail: '14 Weeks • AI'.

Card 4: Title: 'Supply Chain Optimization Tool'. Sub: 'Wärtsilä'. Detail: '12 Weeks • Software Engineering'.

Card 5: Title: 'Real-Time Sentiment Analysis'. Sub: 'YLE'. Detail: '8 Weeks • AI'.

Card 6: Title: 'IoT Device Management Platform'. Sub: 'Generic Corp'. Detail: '16 Weeks • Software Engineering'.

STRICT PROTOTYPING LOGIC:

Add developer note: 'ON CLICK (Entire Card): Navigate user to the Project Overview (Airbnb Style) Page.'"View 3: Project Overview (Airbnb-Style Listings)
When a user clicks one of the project cards (e.g., "Predictive Maintenance Algorithm"), they are taken to a detailed overview page. This page mimics an Airbnb listing, prominently displaying the Team Hierarchy and non-negotiable contact details (email, LinkedIn) so teachers and users know exactly who is responsible.

Figma Design Prompt: Project Overview
Copy and paste the following prompt into your Figma AI tool or provide it directly to a UI designer:

"Generate a high-fidelity React UI for a 'Project Overview' page on the LuppoGrove platform. This page acts like an Airbnb listing details page for a company's project. Use a Nordic Minimalism aesthetic.

AESTHETIC TOKENS:

Global Canvas: Warm Neutral (#fafaf9).

Surface Areas: Pure White (#ffffff).

Primary Action Color: Calm Green (#2d5a47).

MACRO LAYOUT STRUCTURE:
Implement a full-screen layout with the fixed B2B left sidebar (from the Company View) and a fluid main content area.

MAIN CONTENT HEADER & HERO:

Padding: 48px. Background: #fafaf9.

Breadcrumb: 'Projects / Software Engineering / Konecranes'.

Title: 'Predictive Maintenance Algorithm' (36px, Bold, Dark Gray).

Subtitle Row: '12 Weeks • Software Engineering'.

Hero Image: A wide, rounded rectangle (Height: 300px, Radius: 20px) featuring a high-quality abstract tech graphic.

CONTENT SPLIT LAYOUT (The Airbnb Pattern):

Below the image, create a 2-column grid. Left Column (65% width) for Project Overview. Right Column (35% width) for the Sticky Contact & Action Card. Gap: 48px.

LEFT COLUMN (Project Details):

Auto-Layout Column, Gap 32px.

Section 1: 'About this Project' (24px, Bold). Add paragraph detailing the company and the specific problem they want solved.

Section 2: 'What the company offers' (24px, Bold). Bullet points: 'Access to 3TB of crane telemetry data', 'Weekly mentorship meetings', 'Potential for summer internships'.

RIGHT COLUMN (Sticky Team Hierarchy & Contact Card):

'Responsible Persons Box' (Background: #ffffff, Radius: 16px, Padding: 32px, Shadow: heavy drop shadow).View 3: Project Overview (Airbnb-Style Listings)
When a user clicks one of the project cards (e.g., "Predictive Maintenance Algorithm"), they are taken to a detailed overview page. This page mimics an Airbnb listing, prominently displaying the Team Hierarchy and non-negotiable contact details (email, LinkedIn) so teachers and users know exactly who is responsible.

Figma Design Prompt: Project Overview
Copy and paste the following prompt into your Figma AI tool or provide it directly to a UI designer:

"Generate a high-fidelity React UI for a 'Project Overview' page on the LuppoGrove platform. This page acts like an Airbnb listing details page for a company's project. Use a Nordic Minimalism aesthetic.

AESTHETIC TOKENS:

Global Canvas: Warm Neutral (#fafaf9).

Surface Areas: Pure White (#ffffff).

Primary Action Color: Calm Green (#2d5a47).

MACRO LAYOUT STRUCTURE:
Implement a full-screen layout with the fixed B2B left sidebar (from the Company View) and a fluid main content area.MAIN CONTENT HEADER & HERO:

Padding: 48px. Background: #fafaf9.

Breadcrumb: 'Projects / Software Engineering / Konecranes'.

Title: 'Predictive Maintenance Algorithm' (36px, Bold, Dark Gray).

Subtitle Row: '12 Weeks • Software Engineering'.

Hero Image: A wide, rounded rectangle (Height: 300px, Radius: 20px) featuring a high-quality abstract tech graphic.

CONTENT SPLIT LAYOUT (The Airbnb Pattern):

Below the image, create a 2-column grid. Left Column (65% width) for Project Overview. Right Column (35% width) for the Sticky Contact & Action Card. Gap: 48px.

LEFT COLUMN (Project Details):

Auto-Layout Column, Gap 32px.

Section 1: 'About this Project' (24px, Bold). Add paragraph detailing the company and the specific problem they want solved.

Section 2: 'What the company offers' (24px, Bold). Bullet points: 'Access to 3TB of crane telemetry data', 'Weekly mentorship meetings', 'Potential for summer internships'.

RIGHT COLUMN (Sticky Team Hierarchy & Contact Card):

'Responsible Persons Box' (Background: #ffffff, Radius: 16px, Padding: 32px, Shadow: heavy drop shadow).

Header: 'Team Hierarchy & Contacts' (18px, SemiBold).

Profile 1: Avatar (AC). Name: 'Alex Chen'. Role Pill: 'Owner'. Icons: Small Email icon (non-negotiable) and LinkedIn logo.

Profile 2: Avatar (MS). Name: 'Maria Santos'. Role Pill: 'Co-owner'. Icons: Email, Phone, LinkedIn.

Profile 3: Avatar (DL). Name: 'David Lee'. Role Pill: 'Developer'. Icons: Email, LinkedIn.

Divider Line.

Big CTA Button: 'Submit Idea to this Course' (Solid Calm Green).

Developer Note: 'ON CLICK: Trigger the AI Project Wizard Modal.'

Ensure the layout uses ample white space and clear typographic hierarchy."View 4: Teacher's Dashboard & Course Builder
Teachers must see their active courses alongside past courses (which remain visible but are strictly marked as "closed" and read-only). When adding a new course, teachers can clearly see a dropdown showing which old course they want to duplicate.

Additionally, this view establishes the Moodle-style deadline feature. Teachers can set up a task, leave comments/feedback for the company, and utilize a toggle to allow the company to resubmit.

Figma Design Prompt: Teacher's Dashboard & Builder
Copy and paste the following prompt into your Figma AI tool or provide it directly to a UI designer:

"Generate a high-fidelity React dashboard UI for a 'Teacher Course Management' screen on the LuppoGrove platform. Use a Nordic Minimalism aesthetic.

AESTHETIC TOKENS:

Global Canvas: Warm Neutral (#fafaf9).

Surface Areas: Pure White (#ffffff).

Primary Action Color: Calm Green (#2d5a47).

Closed/Past Status: Muted Slate Gray (#94a3b8).

MACRO LAYOUT STRUCTURE:
Implement a full-screen desktop layout with a Top Header Navigation and a main content area.

TOP HEADER & DASHBOARD:

Left side: 'LuppoGrove' logo. Right side: User Profile (Prof. Maria).

Main Area Header: 'My Course Management' (32px, Bold).

COURSE LISTS (Active vs. Past):

Create two distinct sections.

Section 1: 'Active Courses'. Render a white card for 'Fall 2026: Capstone Project'. Features active edit buttons.Section 2: 'Past Courses (Read-Only)'. Render a grayed-out card for 'Spring 2025: Capstone Project'. Overlay a prominent dark gray pill reading 'CLOSED - Read Only'. Add a developer note: 'Teachers can click to view past data, but cannot edit fields.'

CREATE NEW COURSE (Duplication Feature):

Below the courses, a section to create a new course.

Primary Button: '+ Create New Course'.

Next to it, an interactive Dropdown labeled 'Duplicate from past course...'. When expanded, it lists: 'Spring 2025 Capstone', 'Fall 2024 Capstone'. Add developer note: 'Teacher must clearly see WHICH course they are duplicating.'

MOODLE-STYLE TASK & DEADLINE SETTINGS (Inside the Builder):

'Set Up Company Deadlines & Tasks' Card (White, 16px radius, padding 32px).

Subtext: 'Define tasks for companies and manage their submissions.'

UI: A row for a task. Input 'Deliverable Name' (e.g., 'Architecture Review'). Date Picker for Deadline.

Review & Feedback UI: Below the task, render a 'Teacher Feedback' area. A text area titled 'Leave a comment for the company:'. Next to it, a toggle switch labeled 'Allow Company to Resubmit (Opens submission box again)'.

Ensure the UI visually communicates extreme flexibility and clear states between active and closed courses."View 5: Teacher's Proposal Pipeline Review
This is the exact view where teachers (like Prof. Maria Paasivaara) review incoming proposals. It populates with real-world data and includes a streamlined action flow.

Crucial Logic: The platform is not a communication tool. If a teacher wants revisions, clicking the "Request Revisions" button pops up the contact person's email and LinkedIn, forcing communication to happen on external, third-party platforms.

Figma Design Prompt: Teacher's Pipeline
Copy and paste the following prompt into your Figma AI tool or provide it directly to a UI designer:

"Generate a high-fidelity React dashboard UI for the 'Teacher Proposal Pipeline' on the LuppoGrove platform. This view is tailored for reviewing incoming industry projects. Use a Nordic Minimalism design system.

AESTHETIC TOKENS:

Global Canvas Background: Warm Neutral (#fafaf9).

Surface Areas (Cards): Pure White (#ffffff).

Primary Action Color: Calm Green (#2d5a47).

Success Accent: Soft Emerald (#10b981).

MAIN CONTENT AREA (Header & Filters):

Background: #fafaf9. Padding: 40px. Auto-Layout Column.

Title Area: 'Incoming Industry Proposals' (32px, Bold).

Sub-stats: '6 Total Submissions | Status: Ready for Review (6) | Status: Missing Info (0)'.

Filter Bar: Horizontal auto-layout pill: 'Filter by Tech Stack'.THE PROPOSAL PIPELINE LIST (Exact Real-World Data):

Create an Auto-Layout Column (Gap 16px) containing 6 'Proposal Row Components'.

Row Anatomy: White card, 12px radius, Border: 1px solid #eaeaea.

Middle Section: 'AI Extraction Score: 6/6'. Below it, green checkmarks reading: 'Intro | Goals | Tech | Students | Legal (LUT NDA) | Client'.

Right Side: A button 'View Full Proposal'. Developer Note: 'ON CLICK: Opens the detailed view.'

POPULATE THE 6 ROWS WITH THIS EXACT TEXT:

ROW 1: 'AI-Powered Food Waste Reduction App' | 'Code Ananas (Tekla Wannas / Roope Vuorinen)' | 'Node.js, React, Cosmos DB'

ROW 2: 'Post-Tinder Relationship Platform MVP' | 'Lovnity Oy (Tomi Verkkomäki)' | 'Python, React, PostgreSQL'

ROW 3: 'Automating Retail Inventory with Computer Vision' | 'ReEmber Oy (Oona Linna)' | 'NextJS, AWS, PyTorch'

ROW 4: 'Keys2Balance Training & Assessment Platform' | 'Keys2Balance Oy (Carita Nyberg)' | 'Full-stack Web, Wix'

ROW 5: 'Aihana Mobile Invoice Approval App' | 'Virnex (Tom Gustafsson)' | 'React Native, REST API'

ROW 6: 'Peikko 3D Step-file Converter SaaS' | 'Peikko Group (Sampo Pilli-Sihvola)' | 'Blazor C#, Azure'DETAILED VIEW ACTION PACK (Bottom of Screen / Modal):

When a teacher views the full proposal, show a 'Coordinator Actions' box.

Button 1 (Primary Green): 'Approve & Publish to Marketplace'. Dev Note: 'Uploads the project into the actual course page as attending.'

Button 2 (Secondary Outline): 'Request Revisions from Company'.

Dev Note for Button 2: 'CRITICAL: Do NOT build an in-app chat. Clicking this triggers a popup modal showing the contact person's Email and LinkedIn link, directing the teacher to use a third-party platform for communication.'"View 6: My Proposals & Full-Page Template Editor
Once a proposal is drafted via the AI Wizard, it is saved to the "My Proposals" section.

Figma Design Prompt: My Proposals & Template Editor
Copy and paste the following prompt into your Figma AI tool or provide it directly to a UI designer:

"Generate a high-fidelity React UI for a full-page 'Proposal Template Editor' within the 'My Proposals' section of the LuppoGrove platform. This view allows companies to review and edit the AI-generated proposal. It must use a distinct, focused color scheme to differentiate it from the standard dashboard.

AESTHETIC TOKENS:

Global Canvas Background: Deep Slate Navy (#0f172a) - This creates a distinct 'Focus Mode'.

Surface Areas (Cards): Pure White (#ffffff).

Primary Action Color: Calm Green (#2d5a47).

Typography: Inter.

MACRO LAYOUT STRUCTURE:
Implement a full-screen desktop layout with a centered max-width container (900px) to simulate a physical document editing experience.

TOP HEADER (Sticky):

Background: Transparent. Padding: 32px 0.

Left side: A white back arrow icon with text 'Back to My Proposals' (White text, 14px).

Right side: Flex row. Ghost button 'Discard Draft' (White outline). Solid primary button 'Save Changes' (Calm Green background, White text).

DOCUMENT HEADER:

Below the top header, text: 'Review your submission for LUT Capstone' (White text, 32px, Bold).

Subtext: 'The AI has formatted your chat into the required fields. You can manually edit any embossed field below.' (Light gray text, 16px).THE EMBOSSED EDITABLE TEMPLATE (The Form):

Create an Auto-Layout column containing 'Embossed Editable Cards'.

Card 1 (Title):

Label outside card: '1. Project Title' (White, 14px, Bold).

Input Card: Background #ffffff, Border Radius 12px, Padding 24px. Deep, inset shadow to make it look heavily embossed (e.g., box-shadow: inset 0 2px 4px rgba(0,0,0,0.06)).

Text inside input: 'Predictive Maintenance Model for Telemetry Data' (Dark gray, 18px, Editable text cursor visible).

Card 2 (Goals):

Label: '2. Project Goals & Benefits'

Input Card: Large text area, embossed styling. Text inside: 'To build a functional MVP that analyzes crane telemetry...'

INTERACTION PROTOTYPING:

Ensure all white embossed cards clearly look like editable text fields (include a subtle blue/green focus ring on one of the cards to indicate active typing state)."