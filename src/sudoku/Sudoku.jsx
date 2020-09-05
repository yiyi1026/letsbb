import React,{useState} from 'react'
import Cell from './Cell'
import { Box } from '@material-ui/core'

export default function Sudoku(props) {

    const generateGame = () => {
        return [
            [1,2,3,4,5,6,7,8,9],
            [1,2,3,4,5,6,7,8,9],
            [1,2,3,4,5,6,7,8,9],
            [1,2,3,4,5,6,7,8,9],
            [1,2,3,4,5,6,7,8,9],
            [1,2,3,4,5,6,7,8,9],
            [1,2,3,4,5,6,7,8,9],
            [1,2,3,4,5,6,7,8,9],
            [1,2,3,4,5,6,7,8,9]
        ]
    }

    const game = generateGame()

    const [selected,setSelected] = useState([8, 7])

    const selectCell = (x,y) => {
        setSelected([x,y])
    } 

    return (
        <div width="100%">
            <Box width="100%" display="flex" flexDirection="column">
                {[...Array(9).keys()].map(x => {
                    return <Box key={"row"+x} display="flex" flexDirection="row" width="100%"  justifyContent="center">
                        {[...Array(9).keys()].map(y => {
                            return <Cell className="column" 
                                    key={y} 
                                    x={x} 
                                    y={y} 
                                    value={game[x][y]}
                                    onClick={() => { selectCell(x, y); }}
                                    selected= {x === selected[0] && y === selected[1]}
                                    />
                        })}
                    </Box>
                })}
            </Box>
        </div>
    );
}