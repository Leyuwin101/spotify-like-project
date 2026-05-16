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
 * RENDER ALBUMS
 * 
 * This groups all songs by album name
 * and displays each unique album only once
 */
function renderAlbums(){

    leftContent.innerHTML = "";

    const albums = [...new Set(songs.map(song => song.album))];

    albums.forEach((album) => {

        const box = createInfoBox(
            "fa-solid fa-compact-disc",
            album,
            "Album"
        );

        leftContent.appendChild(box);

    });

}


/**
 * RENDER ARTISTS
 * 
 * This groups all songs by artist name
 * and shows each unique artist only once
 */
function renderArtists(){

    leftContent.innerHTML = "";

    const artists = [...new Set(songs.map(song => song.artist))];

    artists.forEach((artist) => {

        const box = createInfoBox(
            "fa-solid fa-user",
            artist,
            "Artist"
        );

        leftContent.appendChild(box);

    });

}

/**
 * RENDER FAVORITES
 * 
 * This filters songs that are marked as favorite
 * and displays only those songs
 */
function renderFavorites(){

    leftContent.innerHTML = "";

    const favoriteSongs = songs.filter(song => song.favorite);

    favoriteSongs.forEach((song) => {

        const box = createInfoBox(
            "fa-solid fa-heart",
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
 * RENDER RECENT
 * 
 * This shows the most recently played song
 * (currently using last song in array as placeholder)
 */
function renderRecent(){

    leftContent.innerHTML = "";

    const song = songs[songs.length - 1];

    const box = createInfoBox(
        "fa-solid fa-clock",
        song.title,
        song.artist
    );

    box.addEventListener("click", () => {
        loadSong(song);
        playSong();
    });

    leftContent.appendChild(box);

}

/**
 * NAVIGATION
 * 
 * This handles switching what is displayed
 * in the left panel based on category clicked
 * 
 * Each nav item controls what render function runs
 */
navItems.forEach((item) => {

    item.addEventListener("click", () => {

        /**
         * REMOVE ACTIVE CLASS
         * 
         * Clears highlight from all nav items
         * so only one item stays active
         */
        navItems.forEach((nav) => {
            nav.classList.remove("active-nav");
        });

        /**
         * SET ACTIVE CLASS
         * 
         * Highlights the clicked nav item
         */
        item.classList.add("active-nav");

        /**
         * GET CATEGORY
         * 
         * Reads data-category from HTML
         * example: songs, albums, artists
         */
        const category = item.dataset.category;

        /**
         * SWITCH VIEW
         * 
         * This decides what to render
         * based on selected category
         */
        if (category === "songs") {

            renderSongs();

        }

        else if (category === "albums") {

            renderAlbums();

        }

        else if (category === "artists") {

            renderArtists();

        }

        else if (category === "favorites") {

            renderFavorites();

        }

        else if (category === "recent") {

            renderRecent();

        }

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