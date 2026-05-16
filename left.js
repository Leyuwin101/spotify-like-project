/**
 * LEFT PANEL
 * 
 * This file controls the left sidebar
 * where the user can browse and search songs
 * 
 * It handles:
 * - navigation clicks (songs, albums, artists, etc.)
 * - rendering song info cards
 * - filtering songs using search input
 * - updating UI dynamically based on user input
 */

import { songs } from "./song.js";
import { loadSong, playSong } from "./player.js";


/* NAV ITEMS
 * These are the category buttons
 * (songs, albums, artists, favorites, recent)
 */
const navItems = document.querySelectorAll(".nav li");


/* LEFT CONTENT
 * This is where dynamic info cards
 * (songs, albums, artists) will be displayed
 */
const leftContent = document.querySelector(".left-content");


/* SEARCH INPUT
 * This listens to user typing
 * and filters songs in real time
 */
const searchInput = document.querySelector(".search-input");


/**
 * CREATE INFO BOX
 * 
 * This function creates a reusable UI card
 * used for songs, albums, and artists
 * 
 * It builds a clickable element dynamically
 */
function createInfoBox(icon, title, subtitle){

    const box = document.createElement("div");

    box.classList.add("info-box");

    box.innerHTML = `

        <div class="info-icon">
            <i class="${icon}"></i>
        </div>

        <div class="info-details">

            <div class="info-title">
                ${title}
            </div>

            <div class="info-subtitle">
                ${subtitle}
            </div>

        </div>

    `;

    return box;
}


/**
 * RENDER SONGS
 * 
 * This function displays songs inside the left panel
 * 
 * It loops through the song array and creates
 * a card for each song
 * 
 * Clicking a song:
 * - loads it into the player
 * - starts playback immediately
 */
function renderSongs(data = songs){

    leftContent.innerHTML = "";

    data.forEach((song) => {

        const box =
        createInfoBox(
            "fa-solid fa-music",
            song.title,
            song.artist
        );

        box.addEventListener("click", () => {

            loadSong(song);
            playSong();

        });

        leftContent.appendChild(box);

    });

}


/**
 * SEARCH FUNCTION
 * 
 * This listens for user input in the search bar
 * 
 * Every time the user types:
 * - it converts input to lowercase
 * - filters songs by title, artist, or album
 * - re-renders the song list
 */
searchInput.addEventListener("input", () => {

    const value = searchInput.value.toLowerCase();

    const filteredSongs = songs.filter((song) => {

        return (

            song.title.toLowerCase().includes(value)
            ||
            song.artist.toLowerCase().includes(value)
            ||
            song.album.toLowerCase().includes(value)

        );

    });

    renderSongs(filteredSongs);

});


/**
 * NAVIGATION
 * 
 * This handles clicking on nav items
 * (Songs, Albums, Artists, Favorites, Recent)
 * 
 * It:
 * - removes active class from all items
 * - adds active class to clicked item
 */
navItems.forEach((item) => {

    item.addEventListener("click", () => {

        navItems.forEach((nav) => {
            nav.classList.remove("active-nav");
        });

        item.classList.add("active-nav");

    });

});


/**
 * INITIAL LOAD
 * 
 * When the page first loads:
 * - display all songs
 * - highlight the first nav item
 */
renderSongs();

navItems[0].classList.add("active-nav");