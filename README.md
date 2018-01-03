# gatsby-plugin-page-load-delay

A Gatsby plugin to delay page loading. Useful for doing things like custom page animations.

## Install

With Yarn:

```bash
yarn add gatsby-plugin-page-load-delay
```

Or with npm:

```bash
npm install --save gatsby-plugin-page-load-delay
```

## Usage

```javascript
// In your gatsby-config.js
plugins: [
	'gatsby-plugin-page-load-delay',
]
```

Set a window.pageExitTime variable in milliseconds to whatever you want the delay for that page to be.

```javascript
// some-component.js
export default class MyPage extends React.Component {
	constructor(props){
		super(props)
	}
	componentDidMount(){
		// Set delay in milliseconds
		window.pageExitTime = 1000
	}
	render() {
		// A "status" property will be added
		// You can use this to set classes, or trigger animations however you want
		return (
			<section className={this.props.status}>
				Animation status: {this.props.status}
			</section>
		)
	}
}
```


