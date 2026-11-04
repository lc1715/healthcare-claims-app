# Healthcare Claims App

A full-stack web application designed to help users view healthcare claims, understand their healthcare costs, and manage notes associated with their claims. Features rules-based and AI-powered explanations to make healthcare claim information easier to understand.

**Live Demo:** [healthcare-claims-eosin.vercel.app](https://healthcare-claims-eosin.vercel.app/)

## Features

* View healthcare claims for demo users
* View detailed claim information
* View a cost breakdown of billed amounts, allowed amounts, insurance payments, copays, deductibles, coinsurance, and patient responsibility
* Generate rules-based claim explanations and AI-powered explanations using the Gemini API
* Add, edit, and delete notes associated with claims

## Tech Stack

* **Frontend:** Next.js, React, TypeScript, Tailwind CSS
* **Backend:** Next.js Route Handlers, REST APIs
* **Database:** PostgreSQL, Drizzle ORM
* **AI:** Gemini API
* **Deployment:** Vercel, Neon 

## API

The application includes REST API endpoints for:

* Retrieving users and claims
* Retrieving individual claim details
* Creating, retrieving, updating, and deleting claim notes
* Generating AI-powered claim explanations

## Database

PostgreSQL with Drizzle ORM manages three related tables: users, claims, and claim notes. The production database is hosted on Neon.

## Note

This is a project using mock healthcare data for demonstration purposes.

