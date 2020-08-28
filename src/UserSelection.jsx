import { Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import { PersonIcon } from '@material-ui/icons/Person'
import React from 'react'

import Loader from './Loader'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
})

export default class UserSelection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      availableUsers: null
    }

    this.handleSelection = this.handleSelection.bind(this)
    this.renderUserItems = this.renderUserItems.bind(this)

    this.props.getAvailableUsers((err, availableUsers) => {
      this.setState({ availableUsers })
    })
  }

  handleSelection(selectedUser) {
    this.props.register(selectedUser.name)
  }

  renderUserItems() {
    const { availableUsers } = this.state
    if (availableUsers) {
      return availableUsers.map((user) => (
        <ListItem
          autoFocus
          button
          onClick={() => this.handleSelection(user)}
          key={user.name}
        >
          <ListItemAvatar>
            <Avatar src={user.image} alt="" className={useStyles.avatar}>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.statusText} />
        </ListItem>
      ))
    }
    return <></>
  }

  render() {
    const { close } = this.props
    const { availableUsers } = this.state
    console.log(close, availableUsers)
    return (
      <Dialog
        // style={{ minWidth: 400 }}
        onClose={() => close()}
        open
      >
        <DialogTitle id="choose-user-title">Pick your character.</DialogTitle>
        {!availableUsers ? (
          <Loader />
        ) : (
        // eslint-disable-next-line max-len
          <List style={{ minWidth: 600, minHeight: 300 }}>{this.renderUserItems()}</List>
        )}
        <DialogActions>
          <Button autoFocus onClick={() => close()} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
