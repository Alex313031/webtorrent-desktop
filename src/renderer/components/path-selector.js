const path = require('path')

const remote = require('@electron/remote')
const React = require('react')
const PropTypes = require('prop-types')

const Button = require('@material-ui/core/Button').default
const TextField = require('@material-ui/core/TextField').default
const grey = require('@material-ui/core/colors/grey').default

// Lets you pick a file or directory.
// Uses the system Open File dialog.
// You can't edit the text field directly.
class PathSelector extends React.Component {
  static propTypes () {
    return {
      className: PropTypes.string,
      dialog: PropTypes.object,
      id: PropTypes.string,
      onChange: PropTypes.func,
      title: PropTypes.string.isRequired,
      value: PropTypes.string
    }
  }

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const opts = Object.assign({
      defaultPath: path.dirname(this.props.value || ''),
      properties: ['openFile', 'openDirectory']
    }, this.props.dialog)

    const filenames = remote.dialog.showOpenDialogSync(remote.getCurrentWindow(), opts)
    if (!Array.isArray(filenames)) return
    this.props.onChange && this.props.onChange(filenames[0])
  }

  render () {
    const id = this.props.title.replace(' ', '-').toLowerCase()
    const wrapperStyle = {
      alignItems: 'center',
      display: 'flex',
      width: '100%'
    }
    const labelStyle = {
      flex: '0 auto',
      marginRight: 10,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
    const textFieldStyle = {
      color: grey['50'],
      flex: '1'
    }
    const text = this.props.value || ''
    const buttonStyle = {
      marginLeft: 10
    }

    return (
      <div className={this.props.className} style={wrapperStyle}>
        <div className='label' style={labelStyle}>
          {this.props.title}:
        </div>
        <TextField
          className='control'
          disabled
          id={id}
          style={textFieldStyle}
          value={text}
        />
        <Button
          className='control'
          onClick={this.handleClick}
          style={buttonStyle}
          variant='contained'
        >
          Change
        </Button>
      </div>
    )
  }
}

module.exports = PathSelector
