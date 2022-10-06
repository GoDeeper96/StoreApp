import React, { useState } from "react";
import {View} from 'react-native'
import {
    Provider,
    Stack,
    Button,
    Dialog,
    DialogHeader,
    DialogContent,
    DialogActions,
    Text,
    TextInput,
  } from "@react-native-material/core";

const SelectableItem2Modify = (props) => {
  

  return (
    <>
      
      <Dialog visible={props.visibility} onDismiss={props.visible}>
        <DialogHeader title="Detalles de archivo" />
        <DialogContent>
          <Stack spacing={2}>
            <Text>Escriba el nombre del archivo con el que desea guardarlo.</Text>
            <TextInput label="Nombre del archivo" variant="standard" onChangeText={props.onChangeText} value={props.value}/>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            title="Cancelar"
            compact
            variant="text"
            onPress={props.visible}
          />
          <Button
            title="Guardar"
            compact
            variant="text"
            onPress={props.SaveChanges}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};


export default SelectableItem2Modify;