using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class PlayerImage : MonoBehaviour
{
  [SerializeField] Sprite playerAvatar;

  Image avatarImage;

  // Start is called before the first frame update
  void Start()
  {
    avatarImage = GetComponent<Image>();   
    avatarImage.sprite = playerAvatar;
  }

  // Update is called once per frame
  void Update()
  {

  }

  public void DealButtonPressed()
  {
    
  }
}
