import './Visualizer.scss'
import { useEffect, useRef, useState } from "react";
import getPopulatedArray from "../../utilities/getPopulatedArray";
import bubbleSort from '../../algorithms/bubbleSort';
import highlightArrayElements from '../../utilities/highlightArrayElements';
import insertionSort from '../../algorithms/insertionSort';
import { quickSort } from '../../algorithms/quickSort';
import selectionSort from '../../algorithms/selectionSort';
import { mergeSort } from '../../algorithms/mergeSort';
import { useFlashlightButtons } from '../../utilities/useFlashlightButtons';

const COLOR_DEFAULT = ''
const COLOR_ACCESSED = 'red'
const COLOR_SORTED = '#6FC276'
const DELAY = 5
const COMPARISON_DURATION = 20

const Visualizer = () => {
    const [bars, setBars] = useState(getPopulatedArray(50))
    const [sorterState, setSorterState] = useState<'sorting' | 'sorted' | 'ready'>('ready')
    const barContainer = useRef<null | HTMLDivElement>(null)
    const animationTimeouts = useRef<ReturnType<typeof setTimeout>[]>([])

    useEffect(() => initialize(), [])

    function initialize(){
        const children = Array.from((barContainer.current?.children) as HTMLCollectionOf<HTMLElement>)
        children.forEach(child => child.style.backgroundColor = '')
        setBars(window.innerWidth <= 720 ? getPopulatedArray(30) : getPopulatedArray(100))
        setSorterState('ready')
    }

    function cancelSorting() {
        animationTimeouts.current.forEach(clearTimeout)
        initialize()
        setSorterState("ready")
    }

    function runBubbleSort(){
        if (sorterState === 'sorting') cancelSorting()
        if (sorterState === 'sorted') {
            initialize()
            return
        }
        setSorterState('sorting')
        const animations = bubbleSort(bars)
        runSortingAnimation(animations)
    }

    function runInsertionSort(){
        if (sorterState === 'sorting') cancelSorting()
        if (sorterState === 'sorted') {
            initialize()
            return
        }
        setSorterState('sorting')
        const animations = insertionSort(bars)
        runSortingAnimation(animations)
    }

    function runQuickSort(){
        if (sorterState === 'sorting') cancelSorting()
        if (sorterState === 'sorted') {
            initialize()
            return
        }
        setSorterState('sorting')
        const animations = quickSort(bars)
        runSortingAnimation(animations)
    }

    function runSelectionSort(){
        if (sorterState === 'sorting') cancelSorting()
        if (sorterState === 'sorted') {
            initialize()
            return
        }
        setSorterState('sorting')
        const animations = selectionSort(bars)
        runSortingAnimation(animations)
    }

    function runMergeSort(){
        if (sorterState === 'sorting') cancelSorting()
        if (sorterState === 'sorted') {
            initialize()
            return
        }
        setSorterState('sorting')
        const animations = mergeSort(bars)
        runSortingAnimation(animations)
    }

    function runSortingAnimation(animations: [number[], boolean][]){
        if (!barContainer.current){
            throw new Error('No sortable elements found')
        } 
        const children = Array.from((barContainer.current.children) as HTMLCollectionOf<HTMLElement>)
        animations.forEach(([elements, areSwapped], index) => {
            animationTimeouts.current.push(setTimeout(() => {
                if (areSwapped){
                    setBars(bars => {
                        const indexOfComparedValue = elements[0]
                        const nextValue = elements[1]
                        const nextBars = [...bars]
                        nextBars[indexOfComparedValue] = nextValue
                        return nextBars
                    })
                } else {
                    elements.forEach(element => {
                        highlightArrayElements(COLOR_ACCESSED, children[element])
                    })
                }
            }, index * DELAY))

            animationTimeouts.current.push(setTimeout(() => {
                children.forEach((bar, i) => {
                    setTimeout(() => {
                        highlightArrayElements(COLOR_DEFAULT, bar)
                    }, i * DELAY)
                })
            }, index * DELAY + COMPARISON_DURATION))
        })

        animationTimeouts.current.push(setTimeout(() => {
            children.forEach((bar, i) => {
                setTimeout(() => {
                    highlightArrayElements(COLOR_SORTED, bar)
                }, i * DELAY)
            })
            setSorterState('sorted')
        }, animations.length * DELAY + COMPARISON_DURATION))
    }

    useFlashlightButtons()

    return (
        <div className="column">
            <div className="row" ref={barContainer}>
            {bars.map((bar, i) => {
                return <div key={i} className="bar" style={{height: bar}}></div>
            })}
            </div>
            <div className="row">
                <button className='flashlight-button' onClick={runInsertionSort}>Insertion Sort</button>
                <button className='flashlight-button' onClick={runBubbleSort}>Bubble Sort</button>
                <button className='flashlight-button' onClick={runQuickSort}>Quick Sort</button>
                <button className='flashlight-button' onClick={runSelectionSort}>Selection Sort</button>
                <button className='flashlight-button' onClick={runMergeSort}>Merge Sort</button>
            </div>
        </div>
    );
};

export default Visualizer;