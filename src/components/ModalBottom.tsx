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
}

function ModalBottom({ onRequestClose, title, style, children, ...rest }: Props): JSX.Element {
  return (
    <Modal transparent onRequestClose={onRequestClose} {...rest}>
      <KeyboardAvoidingView style={styles.container0} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SafeAreaView style={styles.container1}>
          <View style={styles.container2}>
            <View style={styles.container3}>
              <Text style={styles.title}>{title}</Text>
              <TouchableOpacity style={styles.closeBtn} onPress={onRequestClose}>
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
  closeBtnImg: {
    width: 12,
    height: 12,
  },
})

export default ModalBottom
