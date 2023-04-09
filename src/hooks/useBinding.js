import { useLayoutEffect, useRef } from "react"

function recordPriorDom({ current }) {
	if (current === null) {
		return null
	}
	const { value, selectionStart, selectionEnd } = current
	return {
		value,
		selectionStart,
		selectionEnd,
	}
}

export function useBinding(value) {
	// ref for the (eventually) bound DOM element
	const ref = useRef(null)

	// record DOM before change
	const prior = recordPriorDom(ref)

	// consider restoring selection after DOM change
	useLayoutEffect(() => {
		if (prior && prior.value === value) {
			// DOM value was already aligned.
			// Change probably originated from this control
			// Selection can be preserved
			const { current } = ref
			if (current) {
				current.selectionStart = prior.selectionStart
				current.selectionEnd = prior.selectionEnd
			}
		}
	}, [value])

	// props for the bound control
	return {
		ref,
		value,
	}
}
