document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const noteFormElement = document.getElementById('note-form-element');
    const createNoteButton = document.getElementById('create-note');
    const noteList = document.getElementById('note-list');
    const authDiv = document.getElementById('auth');
    const notesDiv = document.getElementById('notes');
    const noteFormDiv = document.getElementById('note-form');

    let currentNoteId = null;

    const apiUrl = 'http://localhost:3000/api';

    const showNotes = () => {
        authDiv.style.display = 'none';
        notesDiv.style.display = 'block';
        noteFormDiv.style.display = 'none';
        fetchNotes();
    };

    const showNoteForm = (note = {}) => {
        authDiv.style.display = 'none';
        notesDiv.style.display = 'none';
        noteFormDiv.style.display = 'block';
        document.getElementById('note-title').value = note.title || '';
        document.getElementById('note-content').value = note.content || '';
        currentNoteId = note._id || null;
    };

    const fetchNotes = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${apiUrl}/notes`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const notes = await res.json();
        noteList.innerHTML = '';
        notes.forEach(note => {
            const li = document.createElement('li');
            li.textContent = note.title;
            li.addEventListener('click', () => showNoteForm(note));
            noteList.appendChild(li);
        });
    };

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        try {
            const res = await fetch(`${apiUrl}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                showNotes();
            } else {
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        try {
            const res = await fetch(`${apiUrl}/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                showNotes();
            } else {
                console.error('Registration failed:', data.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    });

    noteFormElement.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('note-title').value;
        const content = document.getElementById('note-content').value;
        const token = localStorage.getItem('token');
        try {
            const method = currentNoteId ? 'PUT' : 'POST';
            const url = currentNoteId ? `${apiUrl}/notes/${currentNoteId}` : `${apiUrl}/notes`;
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, content })
            });
            await res.json();
            showNotes();
        } catch (error) {
            console.error('Error during note save:', error);
        }
    });

    createNoteButton.addEventListener('click', () => showNoteForm());

    // Check if user is already logged in
    if (localStorage.getItem('token')) {
        showNotes();
    }
});