import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { factionNames, selections, realmscape, army } from 'ducks'
import { TSupportedFaction } from 'meta/factions'
import { IArmy, TUnits } from 'types/army'
import { ISelections } from 'types/selections'
import { TAllySelectionStore } from 'types/store'
import { getArmy } from 'utils/getArmy'
import { MyDropzone } from './dropZone'

interface ILoadWarscrollArmyProps {
  setFactionName: (value: string | null) => void
  setRealmscape: (value: string | null) => void
  setRealmscapeFeature: (value: string | null) => void
  updateAllyArmy: (payload: { factionName: TSupportedFaction; Army: IArmy }) => void
  updateAllySelections: (payload: TAllySelectionStore) => void
  updateAllyUnits: (payload: { factionName: TSupportedFaction; units: TUnits }) => void
  updateSelections: (payload: ISelections) => void
}

const LoadWarscrollArmyComponent: React.FC<ILoadWarscrollArmyProps> = props => {
  const {
    setFactionName,
    setRealmscape,
    setRealmscapeFeature,
    updateAllyArmy,
    updateAllySelections,
    updateSelections,
  } = props

  const handleWarscrollDrop = useCallback(
    army => {
      setFactionName(army.factionName)

      // Add Ally Game data to the store
      if (army.allyFactionNames.length) {
        army.allyFactionNames.forEach(factionName => {
          const Army = getArmy(factionName) as IArmy
          updateAllyArmy({ factionName, Army })
        })
      }

      updateSelections(army.selections)
      updateAllySelections(army.allySelections)
      setRealmscape(army.realmscape)
      setRealmscapeFeature(army.realmscape_feature)
    },
    [
      setFactionName,
      setRealmscape,
      setRealmscapeFeature,
      updateAllyArmy,
      updateAllySelections,
      updateSelections,
    ]
  )

  return <MyDropzone handleDrop={handleWarscrollDrop} />
}

export const LoadWarscrollArmy = connect(
  null,
  {
    setFactionName: factionNames.actions.setFactionName,
    setRealmscape: realmscape.actions.setRealmscape,
    setRealmscapeFeature: realmscape.actions.setRealmscapeFeature,
    updateAllyArmy: army.actions.updateAllyArmy,
    updateAllySelections: selections.actions.updateAllySelections,
    updateAllyUnits: selections.actions.updateAllyUnits,
    updateSelections: selections.actions.updateSelections,
  }
)(LoadWarscrollArmyComponent)
