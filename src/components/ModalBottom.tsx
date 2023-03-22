import React from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

type Props = React.ComponentProps<typeof Modal> & {
  onRequestClose?: () => void,
  title: string,
  style?: StyleProp<ViewStyle>,
  disabledClose?: boolean,
}

function ModalBottom({ onRequestClose, title, style, children,
  disabledClose, ...rest }: Props): JSX.Element {
  const _onRequestClose = () => {
    if (disabledClose) return
    onRequestClose && onRequestClose()
  }
  return (
    <Modal transparent onRequestClose={_onRequestClose} {...rest}>
      <KeyboardAvoidingView style={styles.container0}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SafeAreaView style={styles.container1}>
          <View style={styles.container2}>
            <View style={styles.container3}>
              <Text style={styles.title}>{title}</Text>
              <TouchableOpacity
                style={[styles.closeBtn, disabledClose && styles.disabled]}
                onPress={_onRequestClose} disabled={disabledClose}>
                <Image
                  source={require('../../assets/cross.png')} 
                  style={styles.closeBtnImg}/>
              </TouchableOpacity>
            </View>
            <View style={style}>
              {children}
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container0: {
    flex: 1,
  },
  container1: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  container2: {
    backgroundColor: '#F1F5FA',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  container3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginLeft: 30,
    flex: 1,
    color: '#313D4F',
    fontSize: 17,
    fontWeight: '700',
  },
  closeBtn: {
    backgroundColor: '#E3E7EC',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
  closeBtnImg: {
    width: 12,
    height: 12,
  },
})

export default ModalBottom
