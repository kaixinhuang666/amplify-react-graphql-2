import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
// import { API } from "aws-amplify";
import { generateClient } from 'aws-amplify/api';
import { Storage } from 'aws-amplify';
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { getNoteByLambda, listNotes } from "./graphql/queries";
import {
  createNoteByLambda,
  createNote as createNoteMutation,
  deleteNoteByLambda,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";
import { getUrl } from 'aws-amplify/storage';
import { uploadData } from 'aws-amplify/storage';
import { remove } from 'aws-amplify/storage'
import { getCurrentUser } from 'aws-amplify/auth';

import { v4 as uuidv4 } from 'uuid';




// const { API } = require('aws-amplify');

// const API = generateClient({authMode: 'userPool'});
const API = generateClient();
const App = ({ signOut }) => {
  const [notes, setNotes] = useState([]);
  const [name, setName] = useState("")
  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    // const apiData = await API.graphql({ query: listNotes });
    // const notesFromAPI = apiData.data.listNotes.items;
    const { username, userId, signInDetails } = await getCurrentUser();
    console.log(userId);
    // const apiData = await API.graphql({ query: getNoteByLambda, variables: {input: { userId }} });
    // const apiData = await API.graphql({ query: getNoteByLambda});
    // const userInfo = await Auth.currentAuthenticatedUser();
    // const userToken = userInfo.signInUserSession.idToken.jwtToken;
    const apiData = await API.graphql({ query: getNoteByLambda,variables: { input: { userId: userId } } });
    
    console.log(apiData);
    
    // const notesFromAPI = apiData.data.getNoteByLambda.items;
    const notesFromAPI = apiData.data.getNoteByLambda;
    console.log(notesFromAPI);

    const notesFromAPI_sort = notesFromAPI.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    await Promise.all(
      notesFromAPI_sort.map(async (note) => {
        if (note.image) {
          const url = await getUrl({ key : note.name });
          note.image = url;
        }
        return note;
      })
    );
    console.log(notesFromAPI_sort)
    setNotes(notesFromAPI_sort);
  }

  async function createNote(event) {
    event.preventDefault();
    console.log(event)
    const form = new FormData(event.target);
    // const image = form.get("image");
    const image = event.target.elements.image.files[0];

    const { username, userId, signInDetails } = await getCurrentUser();
    console.log(`The username: ${username}`);
    console.log(`The userId: ${userId}`);
    console.log(`The signInDetails: ${signInDetails}`);

    const data = {
      name: form.get("name"),
      description: form.get("description"),
      owner: userId,
      // image: image.name,
    };
    // const data = {
    //   name: form.get("name"),
    //   description: form.get("description"),
      
    // };
    if (image) data.image=image.name;
    // if (!!data.image) await uploadData({ key: data.name , file: image });
    if (image) await uploadData({ key: data.name , data: image });
    const uniqueId = uuidv4();
    // await API.graphql({
    //   query: createNoteMutation,
    //   variables: { input: data },
    // });
    // await API.graphql({
    //   query: createNoteByLambda,
    //   variables: { input: data , name: data.name},
    // });
    await API.graphql({
      query: createNoteByLambda,
      variables: { 
        input: {
          id: uniqueId,
          name: data.name,
          description: data.description,
          image: data.image,
          owner: userId}},
    });

    fetchNotes();
    event.target.reset();
  }
  

  async function deleteNote({ id, name }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await remove({ key: name});
    // await API.graphql({
    //   query: deleteNoteMutation,
    //   variables: { input: { id } },
    // });
    await API.graphql({
        query: deleteNoteByLambda,
        variables: { input: { id } },
      });
  }

  return (
    <View className="App">
      <Heading level={1}>My Notes App</Heading>
      <View as="form" margin="3rem 0" onSubmit={createNote}>
      
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Note Name"
            label="Note Name"
            labelHidden
            variation="quiet"
            required
            // onChange={(e) => {
            //   setName(e.target.value)
            // }}
          />
          <TextField
            name="description"
            placeholder="Note Description"
            label="Note Description"
            labelHidden
            variation="quiet"
            required
          />
          <View
          name="image"
          as="input"
          type="file"
          style={{ alignSelf: "end" }}
          // onChange={async (e) => {
          //   // console.log(e)
          //   // console.log(e.nativeEvent.target.files[0])
          //   // const res = await uploadData({ key: name || 'note' + Date.now(), data: e.nativeEvent.target.files[0] });
          //   // console.log(res)
          // }}
          />
          <Button type="submit" variation="primary">
            Create Note
          </Button>
          
        </Flex>
      </View>
      <Heading level={2}>Current Notes</Heading>
      <View margin="3rem 0">
        {notes.map((note) => (
        <Flex
          key={note.id || note.name}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Text as="strong" fontWeight={700}>
            {note.name}
          </Text>
          <Text as="span">{note.description}</Text>
          {note.image && (
            <Image
              src={note.image.url.href}
              alt={`visual aid for ${notes.name}`}
              style={{ width: 400 }}
            />
          )}
    <Button variation="link" onClick={() => deleteNote(note)}>
      Delete note
    </Button>
  </Flex>
))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);