import '@glideapps/glide-data-grid/dist/index.css'

import { DataEditor, GridCellKind, GridColumnIcon } from '@glideapps/glide-data-grid'
import { useEffect, useMemo, useRef, useState } from 'react'

const tempDataPool = [
    {
        id: '001',
        name: 'XC一',
        age: '15',
        isOpen: true,
        hobby: ['music', 'dancing'],
        avatar: ['https://i.pravatar.cc/300'],
        notes: '**This is a markdown cell**'
    },
    {
        id: '002',
        name: 'XC二',
        age: '18',
        isOpen: true,
        hobby: ['basketball', 'music'],
        avatar: ['https://i.pravatar.cc/300'],
        notes: 'true'
    },
    {
        id: '003',
        name: 'XC三',
        age: '23',
        isOpen: false,
        hobby: ['dancing', 'basketball'],
        avatar: ['https://i.pravatar.cc/300'],
        notes: 'true'
    },
    {
        id: '004',
        name: 'XC四',
        age: '25',
        isOpen: true,
        hobby: ['music', 'basketball'],
        avatar: ['https://i.pravatar.cc/300'],
        notes: 'true'
    }
]

const columns = [
    { title: 'ID', width: 100, icon: GridColumnIcon.HeaderRowID },
    { title: '姓名', width: 100, icon: GridColumnIcon.HeaderTextTemplate },
    { title: '年龄', width: 100, icon: GridColumnIcon.HeaderNumber },
    { title: '状态', width: 50 },
    { title: '爱好', width: 200 },
    { title: '头像', width: 200, icon: GridColumnIcon.HeaderImage },
    { title: '笔记', width: 200, icon: GridColumnIcon.HeaderMarkdown }
]

// 组件函数
export default function ReactDataSource(props) {
    const dsId = props.id // 判断数据量
    const ref = useRef(null) // 获取dom容器

    // 生成数据
    const data = useMemo(() => {
        const len = dsId === '1' ? 1000000 : "dsId==='2" ? 100000 : 10
        const tempDataList = new Array(len).fill(0)
        return tempDataList.map((item, index) => {
            const randomIndex = Math.floor(Math.random() * 4)
            const randomItem = tempDataPool[randomIndex]
            const imgIndex = index % 71

            return {
                ...randomItem,
                id: `00${index}`,
                name: `XC${Math.random().toString(36).substring(2, 4)}`,
                avatar: [`https://i.pravatar.cc/300?img=${imgIndex}`]
            }
        })
    }, [dsId])

    //获取单元格内容
    const getData = ([col, row]) => {
        const person = data[row]
        switch (col) {
            case 0:
                return { kind: GridCellKind.RowID, data: person.id, displayData: person.id }
            case 1:
                return {
                    kind: GridCellKind.Text,
                    data: person.name,
                    displayData: person.name,
                    hasMenu: true
                }
            case 2:
                return { kind: GridCellKind.Number, data: person.age, displayData: person.age }
            case 3:
                return {
                    kind: GridCellKind.Boolean,
                    data: person.isOpen,
                    displayData: person.isOpen
                }
            case 4:
                return { kind: GridCellKind.Bubble, data: person.hobby, displayData: person.hobby }
            case 5:
                return { kind: GridCellKind.Image, data: person.avatar, displayData: person.avatar }
            case 6:
                return {
                    kind: GridCellKind.Markdown,
                    data: person.notes,
                    displayData: person.notes
                }
            default:
                return {}
        }
    }

    //动态计算表格尺寸
    const [editorRect, setEditorRect] = useState({ width: 500, height: 300 })
    const { width, height } = editorRect

    useEffect(() => {
        const calcRect = () => {
            // 获取外部容器宽度
            const outerContainerDom = ref.current.parentElement.parentElement
            if (outerContainerDom) {
                const { width, height } = outerContainerDom.getBoundingClientRect()
                setEditorRect({ width: width - 12, height: height - 12 })
            }
        }

        calcRect()
        window.addEventListener('resize', calcRect, false)
        return () => window.removeEventListener('resize', calcRect)
    }, [])

    return (
        <div ref={ref}>
            <DataEditor
                key={dsId}
                width={width}
                height={height}
                columns={columns}
                getCellContent={getData}
                rows={data.length}
                onCellEdited={(p, q) => console.log(p, q)}
            />
            <div id="portal" style={{ position: 'fixed', left: 0, top: 0, zIndex: 9999 }} />
        </div>
    )
}
