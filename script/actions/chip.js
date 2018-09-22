import DialogManager from '../DialogManager';

export default async function chip(message, skipConfirm)
{
  await DialogManager.outputMessage(message, skipConfirm);
}
