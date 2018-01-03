import React, { createElement } from 'react'
import createHistory from 'history/createBrowserHistory'

// Change history
const historyExitingEventType = 'history::exiting'
const getUserConfirmation = (pathname, callback) => {
	if(pathname === document.location.pathname) return
	const event = new CustomEvent(historyExitingEventType, { detail: { pathname } })
	window.dispatchEvent(event)
	// Delay if exit time has been previously supplied by a component
	setTimeout(() => {
		callback(true)
	}, window.pageExitTime)
	window.pageExitTime = 0
}
const history = createHistory({ getUserConfirmation })
history.block((location, action) => location.pathname)
exports.replaceHistory = () => history

class ReplaceComponentRenderer extends React.Component {
	constructor(props) {
		super(props)
		this.state = { status: 'entered' }
		this.listenerHandler = this.listenerHandler.bind(this)
	}
	listenerHandler(event) {
		this.setState({ status: 'exiting' })
	}
	componentDidMount() {
		window.addEventListener(historyExitingEventType, this.listenerHandler)
	}
	componentWillUnmount() {
		window.removeEventListener(historyExitingEventType, this.listenerHandler)
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.location.key !== nextProps.location.key) {
			this.setState({ status: 'entering' })
			setTimeout(() => {
				this.setState({ status: 'entered' })
			}, 1)
		}
	}
	render() {
		return (
			<div>
				{
					createElement(this.props.pageResources.component, {
						...this.props,
						...this.props.pageResources.json,
						status: this.state.status,
					})
				}
			</div>
		)
	}
}

exports.replaceComponentRenderer = ({ props, loader }) => {
	if (props.layout) return undefined
	return createElement(ReplaceComponentRenderer, { ...props, loader })
}