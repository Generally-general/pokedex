# 📘 Pokédex (React)

A React-based Pokédex application built to practice **real-world frontend data handling patterns**, including progressive loading, client-side caching, filtering, and pagination using the public PokeAPI.

This project focuses on **logic and data flow**, not UI polish.

---

## Features

- Browse Pokémon with client-side pagination  
- Search Pokémon by name  
- Filter Pokémon by type  
- Progressive loading of Pokémon details  
- Client-side caching to avoid redundant API calls  
- Graceful loading and empty states  

---

## Key Learning Objectives

This project was built to practice and understand:

- Asynchronous data fetching in React  
- Handling normalized APIs (list endpoint + detail endpoint)  
- Progressive UI rendering (render early, enrich later)  
- Client-side caching strategies  
- Derived state (search + filter + pagination composition)  
- Managing multiple loading boundaries cleanly  

---

## Architecture Overview

### High-level flow

1. **Initial Load**
   - Fetches a large list of Pokémon names + URLs
   - Stores it as the master list

2. **Filtering**
   - Type filter fetches Pokémon by type
   - Search applies within the currently filtered list
   - Pagination operates purely on the filtered result

3. **Rendering**
   - Each Pokémon card fetches its own details lazily
   - Details are cached in memory to avoid refetching

---

## Technical Decisions & Trade-offs

### Progressive Data Fetching

The PokeAPI requires a separate request per Pokémon for detailed data.  
Instead of blocking the UI until all details load:

- The app renders the list immediately  
- Each Pokémon card fetches details independently  
- This improves perceived performance and responsiveness  

---

### Client-side Caching

Pokémon details are cached in-memory during the session to:

- Prevent duplicate network requests  
- Improve performance when paginating or re-filtering  

> **Note:** This is a session-scoped cache.  
> In a production app, eviction or persistence strategies would be added.

---

### Full List Fetch (`limit=2000`)

The app fetches the full Pokémon list upfront to simplify:

- Client-side search  
- Pagination  
- Filter composition  

> **Trade-off:** This approach does not scale well for very large datasets.  
> In a production system, server-side pagination or indexed search would be preferred.

This choice was made **intentionally for learning purposes**.

---

## Error & Loading Handling

- App-level loading state for initial data fetch  
- Per-card loading state for Pokémon details  
- Graceful empty states when no Pokémon match filters  

---

## Tech Stack

- React (Hooks)  
- JavaScript (ES6+)  
- Fetch API  
- PokeAPI (public API)  

No external state management or data-fetching libraries were used to keep the focus on fundamentals.

---

## What This Project Is (and Isn’t)

✔️ A focused frontend learning project  
✔️ Demonstrates real-world data handling patterns  

❌ Not a production-ready Pokédex  
❌ Not optimized for very large datasets  
❌ Not UI/animation heavy by design  

---

## How to Run Locally

```bash
npm install
npm run dev
